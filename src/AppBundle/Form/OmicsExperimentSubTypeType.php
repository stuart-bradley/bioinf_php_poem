<?php
// src/AppBundle/Form/OmicsExperimentSubTypeType.php
namespace AppBundle\Form;

use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Valid;

class OmicsExperimentSubTypeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('omicsExperimentSubTypeString', EntityType::class, array(
                'class' => 'AppBundle:OmicsExperimentSubTypeStrings',
                'choice_label' => 'type',
                'label' => 'Experiment sub-type'))
            ->add('samples', CollectionType::class, array(
                'entry_type' => SampleType::class,
                'allow_add' => true,
                'by_reference' => false,
                'allow_delete' => true,
                'prototype' => true,
                'prototype_name' => '__samples_prot__',
                'constraints' => new Valid()))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\OmicsExperimentSubType',
        ));
    }
}