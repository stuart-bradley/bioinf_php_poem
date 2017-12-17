
<img style="vertical-align: middle;" width="150" src="https://raw.githubusercontent.com/lutrasdebtra/bioinf_php_poem/master/web/poem_logo.png">


## POEM (Portal for Omics Experiment Management) - Overview

POEM is a experiment management system for omics experiments and sequencing runs. It integrates with BioControl 
and existing LDAP/AD authentication systems to make managing experiments digitally easy and seemless. 

Screencaps of the various views can be found in the [`\screenshots` folder](https://github.com/lutrasdebtra/bioinf_php_poem/tree/master/screenshots).

### General Features

* **Omics Experiments**:
  * Project Name.
  * Project ID.
  * Description.
  * Questions. 
  * Experiment BioControl run number.
  * Start and end dates.
  * File upload.
  * Statuses (dated).
  * Experiment Types (e.g. Transcriptomics/Proteomics):
    * Experiment Sub-Types (e.g. Time course).
      * Samples (Integrated with BioControl).
        * BioControl Sample number provides: 
          * Run number.
          * Experiment number.
          * Sample date.
          * Sampled by.
          * Comments.
          * Treated flag.
          * Material type (e.g. DNA).
* **Sequencing Runs**:
  * Start and end dates.
  * Kit type.
  * Material type (e.g. DNA).
  * Run coverage target.
  * Read length. 
  * File upload.
  * Statuses (dated).
  * Samples (same as above).
  
## Installation

Installation is not at this stage particularly seemless, as the system is setup for one specific company. 
However, I will explain how to configure the various components. 

```
git clone https://github.com/lutrasdebtra/bioinf_php_poem
cd /bioinf_php_poem
```

### Prerequisites 

Since POEM is a Symfony application, it relies on PHP and a small number of extensions:
* PHP 7.0.
* Composer
* PHP-LDAP - For the user authentication.
* Microsoft SQL (sqlsrv) PHP driver - Required for interfacing with BioControl. If it's setup in another database, that 
driver will be required instead (see [Misc Config: BioControl](https://github.com/lutrasdebtra/bioinf_php_poem#biocontrol)). 

### Composer Installation

```
composer install
```

During the composer installation a number of third-party packages will be installed:

##### [DoctrineFixturesBundle](https://symfony.com/doc/current/bundles/DoctrineFixturesBundle/index.html)
 
 This bundle is used to setup fixtures both for testing (`/src/AppBundle/DataFixtures/ORM/Test`), 
 and for general website function (`/src/AppBundle/DataFixtures/ORM/Test`).
 The following files in the `Real` folder may need to be modified before use:
 
 * `LoadFOSUsers.php` - This adds users from an LDAP server into POEM - so that users aren't required to
 login before they populate. Currently it only adds users with certain `memberof` strings, which are specific
 to this project. This string populates the `department` and `department_dn` fields. Apart from this, all 
 other populated fields are general fields common to all LDAP systems. 
 * `LoadMaterialTypeStrings.php` - This defines the materials possible for materialType fields.
 * `LoadStatusStrings.php` - This defines the statues possible in status fields.
 * `LoadOmicsExperimentStrings.php` and `LoadOmicsExperimentSubTypeStrings.php` - These two files are linked, as 
 experiment types can have specific sub-types as defined in the prior file's associative array. New sub-types will also 
 need to be added to `LoadOmicsExperimentSubTypeStrings.php`.
 
 In the `Data` folder, `LoadExcelData.php` is used to load pre-exsiting experimental data, and will have to be heavily 
 modified for use with a specific dataset. However, it can easily be ignored by setting the `excel_data_path` parameter
 to blank. 
 
 All of these fixtures have been created so that they can safely used with the `--append` flag.
 
##### [AsseticBundle](https://symfony.com/doc/current/assetic/asset_management.html)

Assetic is used to manage static web assets. All files have been precompiled into the `/web` folder. Any additional assets 
created can be linked via an entry in `app/config/config.yml`: 

```YAML
assetic:
  debug: '%kernel.debug%'
    use_controller: '%kernel.debug%'
    filters:
        cssrewrite: ~
    assets:
      new_asset:
        inputs:
          - "%kernel.root_dir%/../src/AppBundle/Resources/public/location/file.ext"
        output: "location/file.ext"
```

The asset is then moved to the `/web` folder via the command:
```
// Remove the env flag for dev.
php bin/console assetic:dump --env=prod
```

##### [FOSUserBundle](https://symfony.com/doc/current/bundles/FOSUserBundle/index.html) and [FR3DLDAP](https://github.com/Maks3w/FR3DLdapBundle)

These two bundles work in concert to provide the user side of POEM. Both have extensive configuration options in both 
`config.yml` and `security.yml`. The FOSUser entity has been modified to allow for additional LDAP fields, as well as a 
`nullable` password field, since authentication is handled directly by the LDAP server. 

A test LDAP configuration is commented out in `config.yml` which would allow you to test your LDAP connection.

This bundle is also responsible for the `ROLES` for each user. These are (in hierarchical order): 
`ROLE_DIRECTOR, ROLE_MANAGER, ROLE_ADMIN, ROLE_USER`, where `ROLE_USER` is the default role provided to all users. 

To promote and demote users, the bundle has built in command line tools:

```
php bin/console fos:user:promote user.name ROLE_ADMIN
php bin/console fos:user:demote user.name ROLE_ADMIN
```

There are a number of other command line tools, found [here](ndles/FOSUserBundle/command_line_tools.html). Due to the nature
of using the LDAP server, two additional commands have been provided, to create users, and also to update their DNs directly
from the LDAP server, via the custom `UserManager` service:

```
# Creates users:
php bin/console poem:user:create user.name1 user.name2
# Updates DNs of specific users:
php bin/console poem:user:updateDN user.name1 user.name2
# Updates DNs of all users:
php bin/console poem:user:updateDN --all
```

##### [LiipFunctionalTestBundle](https://github.com/liip/LiipFunctionalTestBundle)

This bundle uses fixtures defined in `/src/AppBundle/DataFixtures/ORM/Test` to run functional tests on both
Omics Experiments and Sequencing Runs. These tests can be run via `phpunit`.

##### [DoctrineMigrationsBundle](https://symfony.com/doc/current/bundles/DoctrineMigrationsBundle/index.html)

This bundle allows for database changes during production mode. Migrations are added to the database via:

```
php bin/console doctrine:migrations:migrate
```
The quickest way to generate a migration is to change the appropriate entities and then run:
```
php bin/console doctrine:migrations:diff
```

##### [waldo2188/DatatableBundle](https://github.com/waldo2188/DatatableBundle)

This bundle handles the server-side logic for managing index page datatables. The bulk of the code is inside the related
controllers, and is broken down into the `gridAction()` (which handles routing), and the `datatable()` which handles the 
settings and database interfacing. 

The full documentation can be found on the bundle's github, but it is worth noting how custom renders are used in the POEM
implementation. In the `setFields()` array, a number of the entries have values which are just `id` fields. This is done
because inside the `setRenders()` method, there are paths to Twig templates that actually provide the real value for each 
cell. 

Inside each template, two objects are passed: `dt_item` is the value from `setFields()` (often `id`), and `dt_obj` which is 
the entire entity object. This latter parameter can them be used to get anything from the object, and is more robust than
trying to wrangle custom code into the `setFields()` value. 

Currently, this bundle requires `Twig v1.*`. There has been some testing to confirm it works with `Twig v2.*`, and it may
update in the future. If the update is pulled into the project, some refractoring may need to occur for the new Twig major 
version.

#### Parameters

During the Composer install, a number of parameters must be set, these are as follows:

```YAML
parameters:
  database_host:     127.0.0.1
  database_port:     ~
  database_name:     symfony
  database_name_dev: symfony_dev
  database_user:     root
  database_password: ~
  
  # Mailer config - not used. 
  mailer_transport:  smtp
  mailer_host:       127.0.0.1
  mailer_user:       ~
  mailer_password:   ~
  mailer_email: test@email.com
  
  # LDAP config
  ldap_host: 0.0.0.0
  ldap_port: 363
  ldap_username: admin
  ldap_password: password
  ldap_baseDn: dc=ab,dc=com
  ldap_baseDn_users: ou=group,dc=ab,dc=com
  # This is used to define email addresses.
  ldap_domain_long: ab.com
  
  # Biocontrol server.
  bio_control_host: 0.0.0.0
  bio_control_name: biocontrol
  bio_control_user: admin
  bio_control_password: password
  
  # Excel data location and worksheet.
  excel_data_path: file.xlsx
  excel_data_worksheet: worksheet1
  
  # A secret key that's used to generate certain security-related tokens
  secret: ThisTokenIsNotSoSecretChangeIt

```

### Database Installation

The following commands must also be run with the `dev` and `test` `env` flags:

```
php bin/console doctrine:database:create --env=prod
php bin/console doctrine:schema:update --force --env=prod
php bin/console doctrine:fixtures:load --fixtures=src/AppBundle/DataFixtures/ORM/Real --env=prod
php bin/console doctrine:migrations:version --add --all --env=prod
```

### Misc Config

#### BioControl 

BioControl may need a number of changes before it works correctly. 

Firstly, the driver may need to be changed in the `config*.yml` files from microsoft sql:

```YAML
doctrine:
  dbal:
    default_connection: default
      connections:
        default:
          driver:   pdo_mysql
          host:     "%database_host%"
          port:     "%database_port%"
          dbname:   "%database_name_dev%"
          user:     "%database_user%"
          password: "%database_password%"
          charset:  utf8mb4
        bio_control:
          driver:   sqlsrv # See here
          host:     "%bio_control_host%"
          dbname:   "%bio_control_name%"
          user:     "%bio_control_user%"
          password: "%bio_control_password%"
    orm:
        auto_generate_proxy_classes: "%kernel.debug%"
        naming_strategy: doctrine.orm.naming_strategy.underscore
        auto_mapping: true
```

Additionally, in `src/AppBundle/BioControl/BioControlManager.php` a very specific SQL query is used to get the
required information:

```php
$queryBuilder = $bioControlEm->createQueryBuilder();
        $queryBuilder
            ->select('s.SmpID', 's.RunID', 'r.ExpID', 's.Dat', 'p.PerNam', 'r.InoculationTime')
            ->from('Samples', 's')
            ->leftJoin('s', 'Runs', 'r', 's.RunID = r.RunID')
            ->leftJoin('s', 'Person', 'p', 's.PerID=p.PerID')
            ->where('s.SmpID = ?')
            ->setParameter(0, $sample_number);
```

If BioControl is setup differently, this query will have to be changed. To function the resulting query needs to look
like the following:

```php
array (
    [0] => array (
        'SmpID' => <integer>,
        'RunID' => <integer>,
        'ExpID' => <integer>,
        'Dat' => <DateTime>,
        'perNam' => <string>,
        'InoculationTime' => <DateTime>
    )   
)
```

Please note, `perNam` must match the `cn` of `FOSUsers`. 

Also in the event BioControl cannot find a `FOSUser` with the `cn` `perNam`, it will generate one in 
`BioControlManager->createNewUser(perNam)`. This function might need to be changed to match any changes made to the 
`FOSUser entity`.

#### LDAP

As mentioned previously in the fixtures section, the `UserManager.php` (which is called by `LoadFOSUsers.php`) file 
might need to be modified heavily before it works correctly. The entire call is designed with a specific LDAP server
in mind, and will not work correctly in other systems. More specifically, `createAllUsers()` and `createUser()` are 
good places to start modification, which many of the other methods supporting them.

#### Excel Data Loading

In the fixtures `Data/LoadExcelData.php` is an example of how to use `PHPExcel` to load experiments into the database. 
Like `FOSUser.php` it is only setup for a very specific file structure, and would have to be heavily modified before use.  

### POEM Component Guide

[This](COMPONENT_GUIDE.md) outlines all the major parts of the POEM system, and should help clarify what each piece of 
code is doing. 