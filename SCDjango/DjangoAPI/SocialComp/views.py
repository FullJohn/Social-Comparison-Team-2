from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.utils import json

from SocialComp.models import PostModel, PostModel_Twitter, QueryModel, QueryExecutedModel
from SocialComp.serializers import PostSerializer, PostSerializer_Twitter, QuerySerializer, QueryExecutedSerializer

from .collection import collections


# Create your views here.
@csrf_exempt
def postAPI(request,id=0):
    jsonData = JSONParser().parse(request)
    get_posts = jsonData.get('getPosts')
    platform = jsonData.get('platform')
    queryId = jsonData.get('queryId')
    
    if platform == "YouTube":
        if request.method=='GET' or get_posts==True:
            if queryId == "all":
                posts = PostModel.objects.all()
            else:
                posts = PostModel.objects.filter(QueryId=queryId)
       
            post_serializer = PostSerializer(posts, many=True)
            
            return JsonResponse(post_serializer.data, safe=False)
        elif request.method == 'POST':
            post_data = JSONParser().parse(request)
            
            post_serializer = PostSerializer(data = post_data)
            if post_serializer.is_valid():
                post_serializer.save()
                return JsonResponse("Added Post Successfully", safe=False)
            return JsonResponse("Failed to Add Post", safe=False)

        elif request.method == 'DELETE':
            post = PostModel.objects.get(PostId = id)
            post.delete()
            return JsonResponse("Deleted Post Successfully", safe=False)
    elif platform == "Twitter":
        if request.method=='GET' or get_posts==True:
            if queryId == "all":
                posts = PostModel_Twitter.objects.all()
            else:
                posts = PostModel_Twitter.objects.filter(QueryId=queryId)

            post_serializer = PostSerializer_Twitter(posts, many=True)
            
            return JsonResponse(post_serializer.data, safe=False)
        
        elif request.method == 'POST':
            post_data = JSONParser().parse(request)
            
            post_serializer = PostSerializer_Twitter(data = post_data)
            if post_serializer.is_valid():
                post_serializer.save()
                return JsonResponse("Added Post Successfully", safe=False)
            return JsonResponse("Failed to Add Post", safe=False)

        elif request.method == 'DELETE':
            post = PostModel_Twitter.objects.get(PostId = id)
            post.delete()
            return JsonResponse("Deleted Post Successfully", safe=False)
    else:
        return JsonResponse("Failed to ascertain platform", safe=False)

    """
    May implement later, for now don't need to update values
    elif request.method == 'PUT':
    """

@csrf_exempt
def queryAPI(request, id=0):
    if request.method == 'GET':
        queryId = 0
        query = QueryModel.objects.get(QueryId=queryId)
        query_serializer = QuerySerializer(query, many=True)
        return JsonResponse(query_serializer.data, safe=False)

    elif request.method == 'POST':
        query_data = JSONParser().parse(request)
        print(query_data, type(query_data))

        if(query_data['numBrands'] == 1 or query_data['numBrands'] == 2):
            query_data['brand3'] = str('FalseFalse')
            if(query_data['numBrands'] == 1):
                query_data['brand2'] = 'FalseFalse'

        
        print(query_data, type(query_data))
        query_serializer = QuerySerializer(data = query_data)
        if query_serializer.is_valid():
            query_serializer.save()
            queryId = query_serializer['QueryId'].value

            query_data = {}
            query_data['QueryId'] = str(queryId)
            query_data['query_ran'] = bool(False)
            query_ran = QueryExecutedSerializer(data = query_data)

            if query_ran.is_valid():
                query_ran.save()
    
            return JsonResponse({'message':"Added Query Successfully", 'redirect': True, 'queryId': queryId}, safe=False)

        return JsonResponse({'message':"Please fill out all the forms", 'redirect': False}, status=500, safe=False)

    elif request.method == 'DELETE':
        query = QueryModel.objects.get(QueryId = id)
        query.delete()
        return JsonResponse("Deleted Query Successfully", safe=False)


@csrf_exempt
def runQuery(request):

    if request.method == 'POST':

        query_id = int(JSONParser().parse(request).get('queryId'))
        query = QueryModel.objects.get(QueryId = query_id)
        query_executed = QueryExecutedModel.objects.get(QueryId = query_id)
        if(query_executed.query_ran):
            return JsonResponse({'message': "Query Already Ran: Redirecting", 'redirect': True}, safe=False)
        else:
            platform = query.platform
            brands = [query.brand1, query.brand2, query.brand3]
            date_range = [query.startDate, query.endDate]
            query_executed.query_ran = True
            query_executed.save()
            collections.run_collection(platform, brands, date_range, query_id)
            return JsonResponse({'message':"Success", 'redirect': True}, safe=False)


@csrf_exempt
def getQuery(request):
    if request.method == 'POST':
        jsonData = JSONParser().parse(request)
        queryId = jsonData.get('queryId')
        query = QueryModel.objects.get(QueryId=queryId)
        query_serializer = QuerySerializer(query)
        return JsonResponse(query_serializer.data, safe=False)


