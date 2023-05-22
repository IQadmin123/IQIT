from g_admin.models import Token_Store
from g_partners.helper import return_response

def verify_token(get_response):
    # One-time configuration and initialization.

    def middleware(request):
        token_delete = True
        if request.headers.get('Authorization'):
            token_delete=Token_Store.objects.filter(token=request.headers.get('Authorization').replace('Bearer ','')).exists()
        if not token_delete:
            data_send={'error':'Authentication token is incorrect or expired. you need to loging again.'}
            return return_response(data_send, 400)
        response = get_response(request)
        return response

    return middleware
