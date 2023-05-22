FROM python:3.9.6
ENV PYTHONUNBUFFERED=1
RUN mkdir /egg-staging
COPY . ./egg-staging
COPY .env ./egg-staging
WORKDIR /egg-staging
ADD . /egg-staging
COPY requirements.txt /egg-staging/requirements.txt
RUN apt update && \
pip install --upgrade pip && \
pip install -r requirements.txt

EXPOSE 8000
CMD ["python3","manage.py","runserver","0.0.0.0:8000"]
