from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        if 'detail' in response.data.keys():
            if response.data['detail'].code == 'not_authenticated':
                response.data['message'] = 'Please provide valid auth token.'
                response.data['error'] = ['Authentication token is incorrect or expired.']
                del response.data['detail']
            elif response.data['detail'].code =='authentication_failed':
                response.data['message'] = 'authentication_failed'
                response.data['error'] = ['Invalid Username or password']
                del response.data['detail']
        response.data['status'] =False
        return response
    else:
        return response