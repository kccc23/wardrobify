import json
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import LocationVO, Hat
from django.views.decorators.http import require_http_methods

class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["import_href"]

class HatEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style_name",
        "color",
        "picture",
        "location",
    ]
    encoders = { "location": LocationVODetailEncoder() }

@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is None:
            hats = Hat.objects.all()
        else:
            hats = Hat.objects.filter(location=location_vo_id)
        return JsonResponse(
            {"hats": hats},
            encoder=HatEncoder,
        )
    else: # "POST"
        content = json.loads(request.body)
        try:
            location = LocationVO.objects.get(import_href=content["location"])
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location"},
                status=400,
            )
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatEncoder,
            safe=False,
        )

@require_http_methods(["DELETE"])
def api_hat(request, pk):
    try:
        hat = Hat.objects.get(id=pk)
        hat.delete()
        return JsonResponse(
            hat,
            encoder=HatEncoder,
            safe=False,
        )
    except Hat.DoesNotExist:
        return JsonResponse({"message": "Does not exist"})
