 Admin interface
======================
.. contents::

Features to add:
----------------------------------
+ Site and resource management

  + Resource administrators can add a new resource (in progress)

  + Resource administrators can modify resource attributes for their resources (e.g., available CPUs)

    1. Resource add permissions

      - User Status : admin | resource-admin

    2. Create Resource

      - Page load : DashboardContainer.checkLogin() -> SettingsContainer.onChangeTab() -> SettingsContainer.ender()

      image:: /img/create1.png
      :width: 40 em
      a) Login and click resource button.

      image:: /img/create2.png
      :width: 40 em
      b) Enter the information for the resource you want to add.

    3. Create Submit

      - Data Transfer : resourceContainer.queryConfirmReservation() -> createResource.py -> ResourceManager.py

      image:: /img/submit1.png
      :width: 40 em
      a) site imformation : Saved in the site table of the pragma database.
      - used function : ResourceManager.createResource()

      image:: /img/submit2.png
      :width: 40 em
      b) site connection type :  Saved in the connection_type table of the pragma database.
      - used function : ResourceManager.setConnectionType()

      image:: /img/submit3.png
      :width: 40 em
      b) site image type :  Saved in the image_type table of the pragma database.
      - used function : ResourceManager.setImageType()

    4. Modify Resource

      - Page load : cardContainer.onMoreInfoClick() -> cardDescription.js -> dashBoardContainer.modifyResourceInfo() -> modifyContainer.render()

      image:: /img/modify1.png
      :width: 40 em
      a) Login and click modify button
      - Only access the modify form to the admin and the resource-admin that created the resource.

      image:: /img/modify2.png
      :width: 40 em
      b) Enter the information for the resource you want to change.

    5. Modify Submit

      - Data Transfer : modifyContainer.queryConfirmReservation() -> modifyResource.py -> ResourceManager.py

      image:: /img/modify_submit1.png
      :width: 40 em
      a) changed imformation : Saved in the site table of the pragma database.
      - used function : ResourceManager.modifyResource()

      image:: /img/modify_submit2.png
      :width: 40 em
      b) changed connection type :  Saved in the connection_type table of the pragma database.
      - used function : ResourceManager.modifyConnectionType()

      image:: /img/modify_submit3.png
      :width: 40 em
      b) changed image type :  Saved in the image_type table of the pragma database.
      - used function : ResourceManager.modifyImageType()

  + Resource administrators can grant access to users or groups to use their resource.

+ User registration

  + Users can register for accounts.  These accounts will need to be approved by the PRAGMA Cloud Administrator

+ User management

  + PRAGMA Cloud Administrators can create user accounts and approve/disapprove pending account request.

+ Group management and access control

  + Create  any number of user groups

  + Grant / modify group access permissions

+ Useful document

  + -DB-

    + Program : MySQL Workbench

    + Document : https://dev.mysql.com/doc/

  + -React-

    + Test for code : https://codepen.io/

    + Document : https://reactjs.org/

    + References Blog : https://velopert.com/reactjs-tutorials
