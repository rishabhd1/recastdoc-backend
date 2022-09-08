from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import os

from .serializers import UploadSerializer


@api_view(['GET'])
def test(request):
    """
    API to test converter service
    """
    return Response({'msg': 'Converter Service Running'})
