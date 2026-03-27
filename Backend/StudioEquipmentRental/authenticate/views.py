from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .utils import verify_firebase_token
from .firebase import *
from .serializers import UserSerializer

User = get_user_model()


def get_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


# 📱 PHONE OTP LOGIN
@api_view(['POST'])
def phone_login(request):
    token = request.data.get('token')

    decoded = verify_firebase_token(token)

    if not decoded:
        return Response({'error': 'Invalid token'}, status=400)

    phone = decoded.get('phone_number')

    if not phone:
        return Response({'error': 'Phone number not found'}, status=400)

    user, created = User.objects.get_or_create(
        phone=phone,
        defaults={'username': phone}
    )

    tokens = get_tokens(user)

    return Response({
        'message': 'Phone login successful',
        'user': UserSerializer(user).data,
        'tokens': tokens
    })


# 🔵 GOOGLE LOGIN
@api_view(['POST'])
def google_login(request):
    token = request.data.get('token')

    decoded = verify_firebase_token(token)

    if not decoded:
        return Response({'error': 'Invalid token'}, status=400)

    email = decoded.get('email')
    uid = decoded.get('uid')
    name = decoded.get('name', '')

    if not email:
        return Response({'error': 'Email not found'}, status=400)

    user, created = User.objects.get_or_create(
        email=email,
        defaults={
            'username': email,
            'google_id': uid,
            'first_name': name
        }
    )

    tokens = get_tokens(user)

    return Response({
        'message': 'Google login successful',
        'user': UserSerializer(user).data,
        'tokens': tokens
    })