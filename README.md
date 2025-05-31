# Get request example
curl -X GET "http://localhost:5000/api/cars?brand=Toyota&model=Camry&availability=true&condition=Used&color=Silver&year=2022&category=68385acce15d429e41201803" \
  -H "Content-Type: application/json" \
  -b cookies.txt