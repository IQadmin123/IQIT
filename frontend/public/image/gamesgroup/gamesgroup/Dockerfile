FROM python:3.6
RUN mkdir /egg-staging
WORKDIR /egg-staging
ADD . /egg-staging
RUN pip install -r requirements.txt
EXPOSE 8000
CMD python manage.py runserver 0:8000
