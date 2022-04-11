from django.contrib import admin
from SocialComp.models import QueryModel, QueryExecutedModel, PostModel, PostModel_Pinterest, PostModel_TikTok, PostModel_Twitter

admin.site.register(QueryModel)
admin.site.register(QueryExecutedModel)
admin.site.register(PostModel)
admin.site.register(PostModel_Twitter)
admin.site.register(PostModel_Pinterest)
admin.site.register(PostModel_TikTok)
# Register your models here.


