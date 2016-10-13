<?php
// src/AppBundle/Form/OmicsExperimentTypeType.php
namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;

class OmicsExperimentTypeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('omicsExperimentTypeString', EntityType::class, array('class' => 'AppBundle:OmicsExperimentTypeStrings','choice_label' => 'type'))
            ->add('omicsExperimentSubTypes', CollectionType::class, array('entry_type' => \AppBundle\Entity\OmicsExperimentSubType::class))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\OmicsExperimentType',
        ));
    }
}