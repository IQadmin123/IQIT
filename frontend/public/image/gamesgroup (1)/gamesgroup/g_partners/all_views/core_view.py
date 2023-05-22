from drf_yasg.inspectors import SwaggerAutoSchema
from rest_framework import status, viewsets

from g_partners.helper import return_response


class CustomAutoSchema(SwaggerAutoSchema):
    def get_tags(self, operation_keys=None):
        tags = self.overrides.get('tags', None) or getattr(self.view, 'my_tags', [])
        getattr(self.view, 'my_tags', [])
        if not tags:
            tags = [operation_keys[0]]
        
        # if self.view.request.method=="POST":
        #     print(self.get_response_schemas(self.get_response_serializers()))
            # code = self.get_responses()
            # print(self.get_request_serializer())
            # print(self.__dict__)
            # code = self.get_response_schemas(self)
            # print(code.__dict__)
            # cd = self.get_request_body_schema(code)
            # print(cd)
        # print(self.view.request.__dict__)
        # print(self.view.request.method)
        return tags
        
    # def get_response_schemas(self,response_serializers):
    # def get_responses(self):
    #     print("\n")
    #     print(self.__dict__)
    #     # print(sel.__dict__)
    #     # print(self._sch)
    #     # print(self.components)
    #     print("\n")
        
    
class BaseViewSet(viewsets.ModelViewSet):
    def create(self, request, *args, **kwargs):
        serializer = self.serializer(data=request.data)
        if serializer.is_valid():
            data_send = {"message": "Added data Successfully"}
            self.save_serializer(serializer)
            return return_response(data_send, status.HTTP_200_OK)
        else:
            errors = [serializer.errors[data][0] for data in serializer.errors]
            data_send = {"error": errors}
            self.log.error(','.join(errors),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

    def save_serializer(self, serializer):
        return serializer.save()

    # Return Serializer of particular class
    def get_serializer_class(self):
        return self.serializer

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            data_send = {"data": serializer.data}
            return return_response(data_send, status.HTTP_200_OK)
        except BaseException as e:
            data_send = {"error": [str(e)]}
            self.log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.delete()
            data_send = {"message": 'data has been deleted succesfully.'}
            return return_response(data_send, status.HTTP_200_OK)
        except Exception as e:
            data_send = {"error": ['No data found']}
            self.log.error('No data found',extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(
                instance, data=request.data, partial=True)
            if serializer.is_valid():
                if instance is None:
                    lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
                    lookup_value = self.kwargs[lookup_url_kwarg]
                    extra_kwargs = {self.lookup_field: lookup_value}
                    serializer.save(**extra_kwargs)
                serializer.save()
                data_send = {
                    "message": 'data has been updated succesfully.', 'data': serializer.data}
                return return_response(data_send, status.HTTP_200_OK)
            else:
                data_send = {'error': [serializer.errors]}
                self.log.error(serializer.errors,extra={'className': self.__class__.__name__,'url_request':request.path})
                return return_response(data_send, status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            data_send = {"error": [str(e)]}
            self.log.error(str(e),extra={'className': self.__class__.__name__,'url_request':request.path})
            return return_response(data_send, status.HTTP_400_BAD_REQUEST)
