import json
from datetime import date, datetime
import django.conf as conf
import pandas as pd
from decouple import config
from django.db import connections
from django.http import JsonResponse
from rest_framework import status


def db_cursor():
    cursor = connections['default'].cursor()
    return cursor


def return_response(message_dict, status_send=status.HTTP_200_OK):
    """To return output in json if header is defined with Accept:application/json and to add status on basis of result.

    Args:
        message_dict (dictionary): to send data output message,error,data or specific detail.
        status_send (status, optional): To send status code from rest_framework status function or class. Defaults to 
                                        status.HTTP_200_OK.

    Returns:
        json: to send output to requested url in json format
    """
    if 'error' in message_dict.keys():
        message_data = message_dict['error']
        message_dict.pop('error')
        message_dict['message'] = ''
        message_dict['errors'] = message_data
        if status_send==status.HTTP_200_OK:
            status_send = status.HTTP_400_BAD_REQUEST
        message_dict['status'] = False
    else:
        if 'message' in message_dict.keys():
            message_data = message_dict['message']
            message_dict.pop('message')
            message_dict['message'] = {'success': message_data}
        message_dict['status'] = True
    return JsonResponse(message_dict, status=status_send)


def convert_dict(request_data):
    return json.loads(json.dumps(request_data.data))


def set_schema(schema_name, key_name):
    if key_name not in conf.settings.DATABASES.keys():
        conf.settings.DATABASES[key_name] = {
            'ENGINE': config('APP_DB_ENGINE'),
            'NAME': config('DB_NAME'),
            'USER': config('DB_USER'),
            'PASSWORD': config('DB_PASSWORD'),
            'HOST': config('DB_HOST'),
            'OPTIONS': {'options': f'-c search_path={schema_name}'},
            'PORT': config('DB_PORT'),
        }


def fetch_data(column_name, query, schema='default'):
    if schema != 'default':
        set_schema(schema, schema)
    cursor = connections[schema].cursor()
    cursor.execute(query)
    df = pd.DataFrame(cursor.fetchall(), columns=column_name)
    return df


def check_in_db(query_check, boolean_data=False):
    """Check in db any suitable query and return output in true or false.
    Args:
        query_check (string): query that you want to check and get output in true or false.
    Returns:
        Boolean: Data exist or not.
    Note:
        Add space after completing query.
    """
    cursor = connections['default'].cursor()
    if boolean_data:
        cursor.execute(query_check)
        return cursor.fetchall()
    else:
        query = f"select exists({query_check});"  # where condtion
        cursor.execute(query)
        return cursor.fetchone()[0]


def get_data(serializers, models, query, fetch_record={}, limit='All'):
    """To get input and output from model with the help of serializer.

    Args:
        serializers (_type_): valid model serializer.
        models (_type_): model which contain output.
        query (_type_): sql squery which runs in raw method to genrate output

    Returns:
        dictionary: return output from the database.
    """
    model_data = serializers(models.objects.raw(query), many=True)
    if limit == "All":
        if fetch_record != {}:
            for all_data in model_data.data:
                for key, value in all_data.items():
                    if fetch_record == {key: value}:
                        return all_data
        else:
            return model_data.data
    else:
        model_output = {}
        while len(model_output) <= limit and len(model_data.data) >= limit:
            for dictonary_key, dictionary_value in model_data.data.items():
                model_output[dictonary_key] = dictionary_value
        return model_output


def update_list(data, for_update=True):
    columns_value = []  # id=1
    if for_update:
        for x in data:
            if isinstance(data[x], str):
                columns_value.append(f"{x}='{data[x]}'")
            else:
                columns_value.append(f"{x}={data[x]}")
        return columns_value


def filter_dict(column_list, data, keep=False):
    """To filter data where we want to remove key and value if exist

    Args:
        remove_list (list): keys of dictionary.
        data (dictionary): data dictionary of all data.
        keep: To decide column list item should remain or not.

    Returns:
        dictionary: data we want to filter
    """
    if keep:
        if isinstance(data, list):
            all_data = []
            for values in data:
                dict_data = {}
                for item in column_list:
                    dict_data[item] = values[item]
                all_data.append(dict_data)
            return all_data
        else:
            for x in column_list:
                if x not in data.keys():
                    data.pop(x)
            return data
    else:
        if isinstance(data, list):
            all_data = []
            for values in data:
                for item in column_list:
                    if item in values.keys():
                        values.pop(item)
                all_data.append(values)
            return all_data
        else:
            for x in column_list:
                if x in data.keys():
                    data.pop(x)
            return data


def convert_to_list(item, data_dict):
    data = []
    for x in data_dict:
        data.append(x[item])
    return data


def get_values(data_dict):
    values = []
    for x in data_dict.values():
        if isinstance(x, str) and x.isdigit() == False or isinstance(x, date) or isinstance(x, datetime):
            values.append(f"'{x}'")
        else:
            values.append(str(x))
    return ','.join(values)


def convert_date(str_date, output_format='%Y-%m-%d', input_format='%d/%m/%Y'):
    """To convert date from string in given format 

    Args:
        str_date (str): string that contains date.
        output_format (str, date): Output to expect from given input. Defaults to '%Y-%m-%d'.
        input_format (str, date): Specify date format from output_format if nothing is specified. Defaults to '%d/%m/%Y'.

    Returns:
        _type_: date or error as condition is specified.
    """
    if output_format == '%Y-%m-%d' and input_format == '%d/%m/%Y':
        return datetime.strptime('-'.join(list(reversed(str_date.split('/')))), output_format).date()
    elif input_format == '%d %m,%Y' and output_format == '%Y-%m-%d':
        return datetime.strptime('-'.join(list(reversed(str_date.split('/')))), output_format).date()
    else:
        return "Please enter valid input and output format."


def create_dict(list_key, list_values):
    data = {}
    for key, value in zip(list_key, list_values):
        data[key] = value
    return data


def filter_data(column_list, data_dict):
    """To filter value as expected in column_list and keep only that value.

    Args:
        column_list (list): list of desire key as required in dictionary.
        data_dict (dictionary): dictionay of all data.

    Returns:
        dictionary: dictionary of filter columns as required in list.
    """
    lst_key = {}
    for key in column_list:
        if key in data_dict.keys():
            lst_key[key] = data_dict[key]
    return lst_key


def create_where(keys_list, values_list, condition):
    str_where = []
    for keys, values in zip(keys_list, values_list):
        if isinstance(values, str) and values.isdigit() == False or isinstance(values, date) or isinstance(values, datetime):
            str_where.append(f"{keys}='{values}'")
        else:
            str_where.append(f"{keys}={values}")

    return f' {condition} '.join(str_where)
