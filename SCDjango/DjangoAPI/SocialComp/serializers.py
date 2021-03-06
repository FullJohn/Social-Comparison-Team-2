from rest_framework import serializers
from SocialComp.models import PostModel, PostModel_Twitter, PostModel_Pinterest, QueryModel, QueryExecutedModel

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostModel
        fields = ('PostId', 'QueryId', 'url', 'title', 'description', 'thumbnail', 'channel', 'date', 'views', 'comments', 'likes')


class PostSerializer_Twitter(serializers.ModelSerializer):
    class Meta:
        model = PostModel_Twitter
        fields = ('PostId', 'QueryId', 'brand', 'url', 'description', 'date', 'likes', 'retweets', 'comments', 'thumbnail', 'views', 'followers')


class PostSerializer_Pinterest(serializers.ModelSerializer):
    class Meta:
        model = PostModel_Pinterest
        fields = ('PostId', 'QueryId', 'brand', 'url', 'description', 'date', 'emojis', 'comments', 'thumbnail', 'followers')


class PostSerializer_TikTok(serializers.ModelSerializer):
    class Meta:
        model = PostModel
        fields = ('PostId', 'QueryId', 'brand', 'playUrl', 'description', 'date', 'likes', 'views', 'comments', 'shares')


class QuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = QueryModel
        fields = ('QueryId', 'platform', 'brand1', 'brand2', 'brand3', 'startDate', 'endDate', 'numBrands')

class QueryExecutedSerializer(serializers.ModelSerializer):
    class Meta:
        model = QueryExecutedModel
        fields = ('QueryId', 'query_ran')