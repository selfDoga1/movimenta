from django.db import models
from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os


class Company(models.Model):
    cnpj = models.CharField(max_length=24)
    name = models.CharField(max_length=128)

    def __str__(self):
        return f'{self.name} / {self.cnpj}'

    class Meta:
        verbose_name = 'Company'
        verbose_name_plural = 'Companies'


class CustomUserManager(UserManager):
    '''
        Custom class to override admin's attributes
    '''
    def _create_user(self, cpf, password, **extra_fields):
        if not cpf:
            raise ValueError('You have not provided a valid cpf')
        
        user = self.model(cpf=cpf, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        
        return user

    def create_user(self, cpf, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(cpf, password, **extra_fields)

    def create_superuser(self, cpf, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(cpf, password, **extra_fields)


class OverwriteStorage(FileSystemStorage):
    '''
        Custom class for the User model to change the default upload comportment
    '''
    def get_available_name(self, name, *args, **kwargs):
        if self.exists(name):
            os.remove(os.path.join(settings.MEDIA_ROOT, name))
        return name


class User(AbstractBaseUser, PermissionsMixin):
    cpf = models.CharField(max_length=16, unique=True)
    name = models.CharField(max_length=128, blank=True, default='')
    phone = models.CharField(max_length=16, blank=True, default='')
    email = models.EmailField(unique=True, blank=True, null=True)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, blank=True, null=True)
    avatar = models.ImageField(upload_to='uploads/avatar', blank=True, storage=OverwriteStorage())

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'cpf'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def get_full_name(self):
        return self.name
    
    def __str__(self):
        return f'{self.name} / {self.cpf}'

