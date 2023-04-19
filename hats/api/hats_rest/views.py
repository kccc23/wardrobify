import json
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import LocationVO, Hat
from django.views.decorators.http import require_http_methods

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style_name",
        "color",
    ]

@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is None:
            hats = Hat.objects.all()
        else:
            hats = Hat.objects.filter(location=location_vo_id)
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else: # "POST"
        pass
