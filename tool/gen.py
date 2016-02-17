import logging
import json
import urllib2
from string import Template
from pyslideshare import pyslideshare

logger = logging.getLogger(__name__)

se_conf = {}

se_conf['liyuhk'] = {
    'info': {
        'fbid': '1482890028',
        'name': 'Yu LI',
        'title': 'Solution Engineer',
        'location': 'Hong Kong, APAC',
        'expertise': 'Ecomm, Marketing Automation'
    },
    'slideshare_api_key': 'nGgKyxzM',
    'slideshare_shared_secret': '0ODIz81B'
}

def get_se_data(se_name):
    if not se_conf[se_name]:
        raise 'error'

    slideshare_api_key = se_conf[se_name]['slideshare_api_key']
    slideshare_shared_secret = se_conf[se_name]['slideshare_shared_secret']
    api = pyslideshare.pyslideshare(
        {
            'api_key': slideshare_api_key,
            'secret_key': slideshare_shared_secret
        },
        verbose=False
    )

    try:
        data = api.get_slideshows_by_tag(tag='facebookse', limit=999)
    except urllib2.HTTPError as e:
        print e
        data = {}

    return json.dumps(data)


if __name__ == "__main__":
    se_name = 'liyuhk'
    se_info = json.dumps(se_conf[se_name]['info'])
    se_data = get_se_data(se_name)
    with open('../index.html.tpl', 'r') as f:
        print Template(f.read()).substitute(se_name=se_name, se_info=se_info, se_data=se_data)

