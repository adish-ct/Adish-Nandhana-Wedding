import urllib.request
import json

def test_get(url):
    req = urllib.request.urlopen(url)
    return json.loads(req.read().decode())

def test_post(url, data):
    req_data = json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=req_data, headers={'Content-Type': 'application/json'})
    resp = urllib.request.urlopen(req)
    return json.loads(resp.read().decode())

def run_tests():
    print("1. Health Check:", test_get("http://127.0.0.1:8000/api/health"))
    print("2. Wedding Info:", test_get("http://127.0.0.1:8000/api/wedding-info"))

    # Test RSVP submission
    rsvp_resp = test_post("http://127.0.0.1:8000/api/rsvp", {
        "guest_name": "Rahul & Swathi",
        "email": "rahul.swathi@example.com",
        "attending": "Yes",
        "guest_count": 2,
        "dietary_preference": "Vegetarian",
        "message": "Super excited to join Adish & Nandhana!"
    })
    print("3. RSVP Post Response:", rsvp_resp)

    # Test Wishes submission
    wish_resp = test_post("http://127.0.0.1:8000/api/wishes", {
        "sender_name": "Anjali & Vivek",
        "relationship": "Family",
        "message": "Wishing Adish & Nandhana a lifetime of happiness, togetherness, and joy!"
    })
    print("4. Wish Post Response:", wish_resp)

    # Verify Wishes Feed
    wishes_data = test_get("http://127.0.0.1:8000/api/wishes")
    print(f"5. Wishes Feed Total: {wishes_data['total']} items")

    # Verify Photos Feed
    photos_data = test_get("http://127.0.0.1:8000/api/photos")
    print(f"6. Photos Album Total: {photos_data['total']} photos")

if __name__ == "__main__":
    run_tests()
