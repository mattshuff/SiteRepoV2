""" Github jobs api is pretty slow (from 0.7s to 5s) so running this script
every ~3 hours and caching results in a json file """
from operator import itemgetter
import json
import requests
import json

if __name__ == "__main__":
    response = requests.get("https://jobs.github.com/positions.json?&location=uk")
    data = response.json()

    # sort list by newest created
    sorted_by_date = sorted(data, key=itemgetter('created_at'), reverse=False)

    final_list = []
    counter = 0

    # Loop over api response, make ID more easily indexed
    for Entry in sorted_by_date:
        Entry['id'] = counter
        counter += 1
        final_list.append(Entry)

    # Write response to file
    with open('cache.json', 'w', encoding='utf-8') as f:
        json.dump(final_list, f, ensure_ascii=False, indent=4)
