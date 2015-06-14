    <script type="text/javascript">
          // The Browser API key obtained from the Google Developers Console.
          var developerKey = 'AIzaSyDaTJUsZ-Fz329lKw5tTcry4DZIq_5s_tY';
          var pickerApiLoaded = false;
          var oauthToken = $root.token;

          // Use the API Loader script to load google.picker and gapi.auth.
          function onApiLoad() {
            gapi.load('picker', {'callback': onPickerApiLoad});
          }

          function onPickerApiLoad() {
            pickerApiLoaded = true;
            createPicker();
          }

          // Create and render a Picker object for picking user Photos.
          function createPicker() {
            if (pickerApiLoaded) {
              var picker = new google.picker.PickerBuilder().
                  addView(google.picker.ViewId.PHOTOS).
                  setOAuthToken(oauthToken).
                  setDeveloperKey(developerKey).
                  setCallback(pickerCallback).
                  build();
              picker.setVisible(true);
            }
          }

          // A simple callback implementation.
          function pickerCallback(data) {
            var url = 'nothing';
            if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
              var doc = data[google.picker.Response.DOCUMENTS][0];
              url = doc[google.picker.Document.URL];
            }
            var message = 'You picked: ' + url;
            document.getElementById('result').innerHTML = message;
          }
    </script>