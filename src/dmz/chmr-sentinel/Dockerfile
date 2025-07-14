FROM python:latest
WORKDIR /app/
ADD . /app
RUN pip install --trusted-host pypi.python.org Flask Redis
EXPOSE 80
CMD ["python", "-u", "app.py"]