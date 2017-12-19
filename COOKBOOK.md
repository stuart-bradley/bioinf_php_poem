## Cook Book for POEM

### Index

- [Start and Stop the Server](#starting-the-server)
- [Database Changes](#database-changes)
  - [Adding a New Column to an Existing Table](#adding-a-new-column-to-an-existing-table)
  - [Adding a New Table](#adding-a-new-table)
- [Form Changes](#form-changes)
  - [Adding a Database Column to a Form](#adding-a-database-column-to-a-form)
  - [Creating a New Form](#creating-a-new-form)
  - [Nesting Forms](#nesting-forms)
  
### Starting the Server

To start the development server run the following command:

```
php bin/console server:run

```

You can use the `--env=prod` flag to start the production database, but it's better to use Apache or something similar. 

### Database Changes

#### Adding a New Column to an Existing Table

In `src/AppBundle/Entity` find the doctrine entity associated with the existing table. In this entity add the following 
parts:

**1. Variable declaration:**

In the annotation, `@Assert` and various other annotations can be included.

```php
/**
 * @var string
 * @ORM\Column(name="new_field", type="text", nullable=true)
 */
 private $newField;
``` 

**2. Getter and Setter Methods:**

```php
/**
 * Get newField
 * @return string
 */
 public function getNewField()
 {
    return $this->newField;
 }

 /**
  * Set newField
  * @param string $newField
  * @return OmicsExperiment
  */
  public function setNewField($newField)
  {
     $this->newField = $newField;

     return $this;
  }
```

**3. Optional: Change constructor:**

For some fields, when the entity is created, there needs to be a default value:

```php
public function __construct()
{
    .
    .
    .
    $this->newField = "Some value";
}
```

**Update the schema**

Finally, run the following command (with the `--env=prod` flag for the production environment):

```
php bin/console doctrine:schema:update --force
```

#### Adding a New Table

Adding a new table is similar to adding a single column, but requires building the whole entity class. Look at existing 
entity classes for a general idea of what can be done (in `src/AppBundle/Entity`).

At it's most basic level, the entity should be as follows (with no columns):

```php
<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * NewTable
 *
 * @ORM\Table(name="new_table")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\NewTableRepository")
 */
class NewTable
{
}
```

Finally, the schema needs to be updated same as above. 

### Form Changes

#### Adding a Database Column to a Form

There are a number of steps to add a column to a form, and a surprisingly large number of files to change. Assuming the 
requisite database changes have been made (see [above](#adding-a-new-column-to-an-existing-table)), then the following files need to be modified:

**1. FormBuilder**

To tell Symfony that the new field is part of a form, a `*Type` class object must be added to the correct `FormBuilder` 
in `src/AppBundle/Form`. Assuming we're building the form for our `NewTable` Entity the addition would look something 
like:

```php
$builder->add('newField', TextType::class, array('required' => false))
```

When adding fields to the `FormBuilder`, a Type class must be specified (and imported), after that there are a large 
number of both HTML and Symfony options that can be included. In this example, we've set the form so that the field is 
not required for submission (and since there's no `@Assert` in the entity, no validation of any kind is performed). 

**2. Form**

Adding a new field to a form is incredibly easy, in fact, all that really needs to done for basic fields is to add the 
following line between the form start and end Twig tags:

```
{{ form_start(form) }}
.
.
.
{{ form_row(form.newField) }}
.
.
.
{{ form_end(form) }}
```

This handles the labeling, input and errors of each field. This can be further seperated out for additional complexity, 
or even completely customised. 

**Index and Show Pages:**

Finally, you'll want to display the new field somewhere, the two obvious places are the Index and the Show pages:

*Index Page:*

The index page uses a DataTable to display information and therefore is a little bit involved to display the information. 
Inside the parent controller, find the `datatable` method, and add a line to the `setFields` array:

```php
->setFields(
    array (
        "New Field" => "x.newField"
    )
)
```

Where the key value is the name of the column, and the value is the value to be displayed. 

If more complicated rendering is required, a value can be added to the `setRenderers` array:

```php
->setRenderers(
    array (
        0 => 'new_table/datatables/_new_table_new_field.html.twig'
    )
)
```

Where the key is the index of the column to custom render, and the value points to a Twig template such as:

```
{{ dt_item }}
```

Or 

```
{{ dt_obj.newField }}
```

Either option produces a similar result. The template gets passed two objects:
- `dt_item` is the value of the `setFields` array value (in this case `newField`).
- `dt_obj` is the entire `NewTable` entity. This can be useful if you want to render multiple fields in a cell, or 
associated entities. 

*Show Page:*
 
Adding the new field to the show field is much simpler. All that needs to be done is something along these lines:

```
<div class="row">
    <div class="col-md-12">
        <strong>New Field</strong>
        <p>{{ new_table.newField }}</p>
    </div>
</div>
```

The outer divs are only required for Bootstrap (v3.0) to render the CSS correctly. If another CSS framework is used, these can 
be ignored. 

#### Creating a New Form

Creating a new form is very similar to above, but includes the creation of a new controller and routes.

This section assumes the form isn't nested. (See [here](#nesting-forms) if it is). It also assumes the database work 
from [Adding a New Table](#adding-a-new-table) has been completed. 

**1. Controller**

The first step is to decide what actions the entity requires - the standard actions are usually: Index, New, Edit, Show, 
and Delete. A sample controller would look something like this:

```php
<?php
// src/AppBundle/Controller/NewTableController.php
namespace AppBundle\Controller;

use AppBundle\Entity\NewTable;
use AppBundle\Form\NewTableType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class NewTableController extends Controller
{
    /**
     * @Route("/new_table/index", name="new_table_index")
     */
    public function indexAction()
    {
        $repository = $this->getDoctrine()->getRepository('AppBundle:NewTable');
        $new_tables = $repository->findAll();
        return $this->render('new_table/index.html.twig', ['new_tables' => $new_tables]);
    }

    /**
     * @Route("/new_table/new", name="new_table_new")
     */
    public function newAction(Request $request)
    {
        $new_table = new OmicsExperiment();
        $em = $this->getDoctrine()->getManager();
        $form = $this->createForm(NewTableType::class, $new_table);
        $form->handleRequest($request);
        // On submission.
        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($new_table);
            $em->flush();
            return $this->redirectToRoute('new_table_index');
        }
        return $this->render('new_table/form.html.twig', array('form' => $form->createView()));
    }
    
    /**
     * @Route("/new_table/show/{id}", name="new_table_show")
     */
    public function showAction($id)
    {
        $repository = $this->getDoctrine()->getRepository('AppBundle:NewTable');
        $new_table = $repository->find($id);
        return $this->render('new_table/show.html.twig', array('new_table' => $new_table));
    }
    
    /**
     * @Route("/new_table/edit/{id}", name="new_table_edit")
     */
    public function editAction(Request $request, $id)
    {
        $repository = $this->getDoctrine()->getRepository('AppBundle:NewTable');
        $new_table = $repository->find($id);
        $em = $this->getDoctrine()->getManager();
        $form = $this->createForm(NewTableType::class, $new_table);
        $form->handleRequest($request);
        // On submission.
        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($new_table);
            $em->flush();
            return $this->redirectToRoute('new_table_index');
        }
        return $this->render('new_table/form.html.twig', array('form' => $form->createView()));
    }

    /**
     * @Route("new_table/delete/{id}", name="new_table_delete")
     */
    public function deleteAction(Request $request, $id)
    {
        $repository = $this->getDoctrine()->getRepository('AppBundle:NewTable');
        $new_table = $repository->find($id);

        $em = $this->getDoctrine()->getManager();
        $em->remove($new_table);
        $em->flush();

        $this->addFlash(
            'notice',
            '"' . $id . '" has successfully been deleted.'
        );

        return $this->redirectToRoute('new_table_index');
    }
}
```

**2. Form Builder** 

Creating the form builder is very similar to above, but requires creating the whole file:

```php
<?php
// src/AppBundle/Form/NewTableType.php
namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\FormBuilderInterface;


class NewTableType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('newField', TextType::class, array('required' => false))
            ->add('save', SubmitType::class, array('label' => 'Create'))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\NewTable'
        ));
    }
}
```

**3. Form:**

Twig forms are at their most basic are incredibly simple, the files for views created should live in 
`app/Resources/views/new_table/`.

```
{# src/AppBundle/Resources/views/new_table/new.html.twig #}
{% extends 'base.html.twig' %}

{% block body %}
    {{ parent() }}
    
    {{form_start(form) }}
        {{ form_widget(form.newField) }}
        {{ form_widget(form.save, { 'label': 'Create New Table' }) }}
        <a href="{{ path('new_table_index') }}" class="btn btn-default" onclick="return redirectConfirm()">Back</a>
        <div style="display: none;">{{ form_rest(form) }}</div>
    {{ form_end(form) }}
{% endblock %}
{% block javascripts %}
    {{ parent() }}
    <script type="text/javascript">
        // Load any required JS here.
    </script>
{% endblock %}
```

The bulk of the form is boilerplate required for Twig templating. 

**4. Other Actions:**

As shown in the example controller, all the other services either pass a single NewTable object, or an array. 
From there it's very easy to build basic HTML/Twig pages for each action.

The only thing worth noting is that the Delete action is headless and doesn't have a page associated with it, instead it 
can be attached to a button like so:

```
<a href="{{ path('sequence_run_delete', {'id': new_table.id}) }}" class="btn btn-default"
           onclick="return confirm('Are you sure you want to delete Sequence Run {{ new_table.id }}?')">Delete</a>
```

#### Nesting Forms

Following on from the previous sections, creating a nested form isn't a huge amount of extra work. The first thing to note is
that you *do not* create a separate controller, as this has already been done inside the parent entity.

**1. Database Changes:** 

To link a parent to a child entity, both entity files need to be modified to reflect this. The following example assumes 
one parent has many children:

*Parent Entity:*

```php
.
.
.
/**
 * @ORM\OneToMany(targetEntity="NewSubTables", mappedBy="newTable", cascade={"persist", "remove"})
 */
private $newSubTables;
.
.
.
public function __construct()
{
    $this->newSubTables = new ArrayCollection();
}
.
.
.
/**
 * Add newSubTable
 * @param \AppBundle\Entity\NewSubTable $newSubTable
 * @return NewTable
 */
public function addNewSubTable(\AppBundle\Entity\NewSubTable $newSubTable)
{
    $this->newSubTables[] = $newSubTable;
    $newSubTable->setNewTable($this);

    return $this;
}

/**
 * Remove newSubTable
 * @param \AppBundle\Entity\NewSubTable $newSubTable
 */
public function removeNewSubTable(\AppBundle\Entity\NewSubTable $newSubTable)
{
    $this->newSubTables->removeElement($newSubTable);
    $newSubTable->setNewTable(null);
}

/**
 * Get newSubTables
 * @return \Doctrine\Common\Collections\Collection
 */
public function getNewSubTables()
{
    return $this->newSubTables;
}
```

*Child Entity:*

```php
.
.
.
/**
 * @ORM\ManyToOne(targetEntity="NewTable", inversedBy="newSubTables")
 * @ORM\JoinColumn(name="new_table_id", referencedColumnName="id")
 */
 private $newTable;
.
.
.
/**
 * Get newTable
 * @return \AppBundle\Entity\NewTable
 */
public function getNewTable()
{
    return $this->newTable;
}

/**
 * Set newTable
 * @param \AppBundle\Entity\NewTable $newTable
 * @return NewSubTable
 */
public function setNewTable(\AppBundle\Entity\NewTable $newTable = null)
{
    $this->newTable = $newTable;

    return $this;
}
```

These are standard Doctrine association joins, and are well documented in the docs if other relationships are needed. 

**2. Form Builder:**

Firstly, a FormBuilder class should be created exactly like above for the nested form, except it has no submit field:

```php
<?php
// src/AppBundle/Form/NewSubTableType.php
namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\FormBuilderInterface;


class NewSubTableType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('newSubField', TextType::class, array('required' => false))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\NewSubTable'
        ));
    }
}
```

In addition to this, the parent FormBuilder should be extended with a `CollectionType` field:

```php
<?php
// src/AppBundle/Form/NewTableType.php
namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Valid;

class NewTableType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('newField', TextType::class, array('required' => false))
            ->add('newSubTables', CollectionType::class, array(
                            'entry_type' => NewSubTableType::class,
                            'allow_add' => true,
                            'by_reference' => false,
                            'allow_delete' => true,
                            'prototype' => true,
                            'prototype_name' => '__newsubtable_prot__',
                            'constraints' => new Valid()))
            ->add('save', SubmitType::class, array('label' => 'Create'))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\NewTable'
        ));
    }
}
```

Take note of the `prototype_name`, this is used in the form itself. 

**3. Form:**

The parent form can then be extended to include the new nested form:

```
{# src/AppBundle/Resources/views/new_table/new.html.twig #}
{% extends 'base.html.twig' %}

{% form_theme form 'new_table/new_table_subfields.html.twig' %}

{% block body %}
    {{ parent() }}
    
    {{form_start(form) }}
        {{ form_widget(form.newField) }}
        
        <h3>Sub Tables</h3>
        <ul style="list-style-type:none;padding-left:0;" class="col-sub_tables">
            {% for sub_table in form.sub_tables %}
                <li class="panel panel-body panel-default">
                    {{ form_widget(sub_table.newSubField) }}
                </li>
            {% endfor %}
        </ul>
        <button type="button" class="btn btn-files btn-success">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Sub Table
        </button>
        
        {{ form_widget(form.save, { 'label': 'Create New Table' }) }}
        <a href="{{ path('new_table_index') }}" class="btn btn-default" onclick="return redirectConfirm()">Back</a>
        <div style="display: none;">{{ form_rest(form) }}</div>
    {{ form_end(form) }}
{% endblock %}
{% block javascripts %}
    {{ parent() }}
    <script type="text/javascript">
        new FormCollections(['sub_tables']);
    </script>
{% endblock %}
```

The `<ul>` and `<button>` blocks that have been added are for pre-existing SubTables. To allow for dynamic addition of 
SubTables, the `{% form_theme ... %}` line is added, which refers to a file that should contain something like:

```
{# app/Resources/views/new_table/new_table_subfields.html.twig #}

{% block _new_table_NewSubTable_entry_row %}
    <li class="panel panel-body panel-default">
        {{ form_row(form.newSubTable) }}
    </li>
{% endblock %}
```

Which defines a prototype form that can be added by `FormCollections`, which is instantitated inside the 
`javascripts` block at the bottom of the file. 

Inside `form_collection.js`, a few additional changes need to be made to make the form fully dynamic:

*A. Add a button prototype:*

```js
self.prototype_buttons['sub_tables'] = '<button type="button" class="btn btn-samples btn-success"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Sub Table </button>';
```

*B. Add an if-else statement to `renamePrototype`:*

When copying the prototypes into the main form, they need to be renamed, so that multiple sub-forms in the same parent 
form. This renaming occurs in the `renamePrototype` function, and would look something like this:

```js
} else if (div_name == "sub_tables") {
    find = '__' + 'sub_table' + '_prot__';
    re = new RegExp(find, 'g');
    curr_index = $(button).data('index');
    newForm = newForm.replace(re, curr_index);
    $(button).data('index', $(button).data('index') + 1);
    return $(newForm);
}
```

*Optional - Greater than 1 Level Nesting:*

In the case of having a `sub_sub_table`, the above renaming becomes more complicated, as additional levels must be 
recursed through. For examples, see `samples` in `form_collection.js:renamePrototype`.

Additionally, `self.relations` and `self.ul_classes` should be extended to include the nested relations. 

