
<img align="center" src="https://raw.githubusercontent.com/lutrasdebtra/bioinf_php_poem/master/web/poem_logo.png">


## POEM - Overview

POEM is a experiment management system for omics experiments and sequencing runs. It integrates with BioControl 
and existing LDAP/AD authentication systems to make managing experiments digitally easy and seemless. 

### General Features

* **Omics Experiments**:
  * Title.
  * Description.
  * Questions. 
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

##### [LiipFunctionalTestBundle](https://github.com/liip/LiipFunctionalTestBundle)

This bundle uses fixtures defined in `/src/AppBundle/DataFixtures/ORM/Test` to run functional tests on both
Omics Experiments and Sequencing Runs. These tests can be run via `phpunit`.

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
  # A secret key that's used to generate certain security-related tokens
  secret: ThisTokenIsNotSoSecretChangeIt

```

### Database Installation

The following commands must also be run with the `dev` and `test` `env` flags:

```
php bin/console doctrine:database:create --env=prod
php bin/console doctrine:schema:update --force --env=prod
php bin/console doctrine:fixtures:load --fixtures=src/AppBundle/DataFixtures/ORM/Real --env=prod
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

Additionally, in `src/AppBundle/Controller/BioControlController.php` a very specific SQL query is used to get the
required information:

```php
$queryBuilder
    ->select('s.SmpID', 's.RunID', 'r.ExpID', 's.Dat', 'p.PerNam')
    ->from('Samples', 's')
    ->innerJoin('s', 'Runs', 'r', 's.RunID = r.RunID')
    ->innerJoin('s', 'Person', 'p', 's.PerID=p.PerID')
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
        'perNam' => <string>
    )   
)
```

Please note, `perNam` must match the `cn` of `FOSUsers`. 

Also in the event BioControl cannot find a `FOSUser` with the `cn` `perNam`, it will generate one in 
`BioControlController->createNewUser(perNam)`. This function might need to be changed to match any changes made to the 
`FOSUser entity`.

#### LDAP

As mentioned previously in the fixtures section, the `LoadFOSUsers.php` file might need to be modified heavily before it
works correctly. A example `load` function is provided below that gets all users and updates their basic attributes:

```php
public function load(ObjectManager $manager)
{
    $options = array(
        'host' => $this->container->getParameter('ldap_host'),
        'port' => $this->container->getParameter('ldap_port'),
        'useStartTls' => true,
        'username' => $this->container->getParameter('ldap_username'),
        'password' => $this->container->getParameter('ldap_password'),
        'baseDn' => $this->container->getParameter('ldap_baseDn_users')
    );

    $ldap = new Ldap($options);
    $ldap->bind();

    $baseDn = $this->container->getParameter('ldap_baseDn_users');
    $filter = '(&(&(ObjectClass=user))(samaccountname=*))';
    $attributes = ['samaccountname', 'dn', 'mail', 'cn'];
    $result = $ldap->searchEntries($filter, $baseDn, Ldap::SEARCH_SCOPE_SUB, $attributes);

    $members = [];

    foreach ($result as $item) {
        if (!in_array($item["samaccountname"][0], $members)) {
            $user = new FOSUser();
            $user->setDn($item["dn"]);
            $user->setEnabled(1);
            $user->setUsername($item["samaccountname"][0]);
            $user->setUsernameCanonical(strtolower($item["samaccountname"][0]));
            $user->setEmail($item["mail"][0]);
            $user->setEmailCanonical(strtolower($item["mail"][0]));
            $user->setCn($item['cn'][0]);
            $user->setFromBioControl(false);

            $this->addReference($item["samaccountname"][0], $user);

            $members[] = $item["samaccountname"][0];
            $manager->persist($user);
        }
    }
    $manager->flush();
}
```
