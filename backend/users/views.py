from pstats import Stats
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .tokenauthentication import JWTAuthentication
from .serializers import UserSerializer, LoginSerializer, OtpVerificationSerializer
from rest_framework import status
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.generics import GenericAPIView
from .models import User
from .email import *
from .serializers import ResetPasswordEmailSerializer, UserResetPasswordSerializer

# Create your views here.


# class UserRegisterView(APIView):
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)


# class LoginView(APIView):
#     def post(self, request):
#         serializer = LoginSerializer(data=request.data)
#         if serializer.is_valid():
#             token = JWTAuthentication.generate_token(payload=serializer.data)
#             return Response({
#                 "message": "Login Successful",
#                 "token": token,
#                 "user": serializer.data
#             }, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)


class UserRegisterView(
    GenericAPIView,
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = "id"

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        id = kwargs.get("id")
        if id is not None:
            return self.retrieve(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        send_otp_via_email(serializer.data['email'])
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginView(GenericAPIView, CreateModelMixin):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        token = JWTAuthentication.generate_token(payload=serializer.data)
        response_data = {
            "message": "Login Successful",
            "token": token,
            "user": serializer.data
        }
        return Response(response_data, status=status.HTTP_201_CREATED)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return self.perform_create(serializer)

class EmailVerificationview(APIView):

    def post(self, request):
        try:
            data = request.data
            serializer = OtpVerificationSerializer(data=data)
            if serializer.is_valid():
                otp = serializer.validated_data['otp']
                user = User.objects.filter(otp=otp).first()  # Use first() instead of is_valid()

                if user:
                    user.is_verified = True
                    user.save()

                    return Response({
                        'status': 200,
                        'msg': "Successfully Verified",
                        'data': serializer.data
                    })
                else:
                    return Response({
                        'status': 400,
                        'msg': "Not Verified",
                        'data': {'otp': ['Invalid OTP']}
                    })
            else:
                return Response({
                    'status': 400,
                    'msg': "Invalid data",
                    'data': serializer.errors
                })
        except Exception as e:
            print(e)
            return Response({
                'status': 500,
                'msg': "Internal Server Error"
            })


class UserResetPasswordEmailView(APIView):
    serializer_class = ResetPasswordEmailSerializer

    def post(self, request, format=None):
        serializer = ResetPasswordEmailSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)
        return Response(
            {"msg": "Password Reset link send. Please check your Email"},
            status=status.HTTP_200_OK,
        )

class ResetPasswordView(APIView):
    serializer_class = UserResetPasswordSerializer

    def post(self, request, uid, token, format=None):
        serializer = UserResetPasswordSerializer(
            data=request.data, context={'uid': uid, "token": token}
        )
        serializer.is_valid(raise_exception=True)
        return Response(
            {"msg": "Password Reset Successfully"}, status=status.HTTP_200_OK
        )
