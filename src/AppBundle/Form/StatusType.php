<?php
// src/AppBundle/Form/StatusType.php
namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

class StatusType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('statusString', EntityType::class, array(
                'class' => 'AppBundle:StatusStrings',
                'choice_label' => 'type',
                'label' => 'Status'))
            ->add('date', DateType::class, array(
                'data' => new \DateTime(),
            ))
        ;

        // Event listener to remove placeholder current date when editing a Status.
        $builder->addEventListener(FormEvents::PRE_SET_DATA, function(FormEvent $event) {
            $status = $event->getData();
            $form = $event->getForm();

            if (!$status) {
                return;
            }

            if ($date = $status->getDate()) {
                $form->add('date', DateType::class, array(
                    'data' => $date,
                ));
            }
        });
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Status',
        ));
    }
}