<?php
// src/AppBundle/Form/OmicsExperimentTypeType.php
namespace AppBundle\Form;

use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Valid;

class OmicsExperimentTypeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('omicsExperimentTypeString', EntityType::class, array(
                'class' => 'AppBundle:OmicsExperimentTypeStrings',
                'choice_label' => 'type',
                'label' => 'Experiment type'))
            ->add('omicsExperimentSubTypes', CollectionType::class, array(
                'entry_type' => OmicsExperimentSubTypeType::class,
                'allow_add' => true,
                'by_reference' => false,
                'allow_delete' => true,
                'prototype' => true,
                'prototype_name' => '__expsubtype_prot__',
                'constraints' => new Valid()))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\OmicsExperimentType',
        ));
    }
}