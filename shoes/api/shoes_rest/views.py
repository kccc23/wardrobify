from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Shoe, BinVO

class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = ["import_href"]

class ShoeEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "id",
        "color",
        "picture",
        "bin",
    ]
    encoders = {
        "bin": BinVOEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_shoes(request, bin_id=None):
    """
    Collection RESTful API handler for list of shoe objects

    GET:
    Returns a list of shoes

    POST:
    Creates a new shoe
    """
    if request.method == "GET":
        if bin_id == None:
            shoes = Shoe.objects.all()
        else:
            shoes = Shoe.objects.filter(bin=bin_id)
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            import_href = f"/api/bins/{bin_id}/"
            binVO = BinVO.objects.get(import_href=import_href)
            content["bin"]=binVO

        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeEncoder,
            safe=False,
        )

@require_http_methods(["DELETE"])
def api_shoe(request, id):
    if request.method == "DELETE":
        try:
            shoe = Shoe.objects.get(id=id)
            shoe.delete()
            return JsonResponse(
                shoe,
                encoder=ShoeEncoder,
                safe=False,
            )
        except Shoe.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
