.. _User Preferences API:

##################################################
User Preferences API
##################################################

This page contains information on using the User Preferences API to
complete these actions:

* `Get and Update the User's Preferences Information`_
* `Get and Update the User's Preferences Details`_

.. _Get and Update the User's Preferences Information:

**************************************************
Get and Update the User's Preferences Information
**************************************************

.. autoclass:: user_api.preferences.views.PreferencesView

**Example response showing the user's preference information**

.. code-block:: json

    HTTP 200 OK
    Content-Type: application/json
    Vary: Accept
    Allow: GET, HEAD, OPTIONS, PATCH

    {
      
    } 

.. _Get and Update the User's Preferences Details:

**************************************************
Get and Update the User's Preferences Details
**************************************************

.. autoclass:: user_api.preferences.views.PreferencesDetailView

**Example response showing the user's preference details**

.. code-block:: json

    HTTP 200 OK
    Content-Type: application/json
    Vary: Accept
    Allow: GET, HEAD, OPTIONS, PATCH

    {
      
    } 