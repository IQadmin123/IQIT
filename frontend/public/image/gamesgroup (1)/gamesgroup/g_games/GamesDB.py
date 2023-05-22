from g_partners.helper import set_schema
import sys

class RouteDb:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        if "/api/country" in request.path:
            schema_path = view_kwargs.get('game_name', 'public')
        
        schema_path = view_kwargs.get('game_name', 'default')
        set_schema(schema_path, schema_path)
