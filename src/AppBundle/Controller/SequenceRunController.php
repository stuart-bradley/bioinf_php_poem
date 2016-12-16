<?php
// src/AppBundle/Controller/SequenceRunController.php
namespace AppBundle\Controller;

use AppBundle\Entity\SequenceRun;
use AppBundle\Form\SequenceRunType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Doctrine\Common\Collections\ArrayCollection;

// TODO: deleteAction should be implemented.

class SequenceRunController extends Controller {
    /**
     * @Route("/sequence_run/index", name="sequence_run_index")
     */
    public function indexAction() {
        // Grab all experiments from database and hand them to template.
        $repository = $this->getDoctrine()->getRepository('AppBundle:SequenceRun');
        $sequence_runs = $repository->findAll();
        return $this->render('sequence_run/index.html.twig',['sequence_runs' => $sequence_runs]);
    }

    /**
     * @Route("/sequence_run/new", name="sequence_run_new")
     */
    public function newAction(Request $request) {
        $sequence_run = new SequenceRun();

        $em = $this->getDoctrine()->getManager();

        $form = $this->createForm(SequenceRunType::class, $sequence_run);

        $form->handleRequest($request);

        // On submission.
        if ($form->isValid()) {
            $em->persist($sequence_run);
            $em->flush();
            return $this->redirectToRoute('sequence_run_index');
        }

        return $this->render('sequence_run/form.html.twig', array('form' => $form->createView(), 'edit' => False));
    }

    /**
     * @Route("/sequence_run/show/{id}", name="sequence_run_show")
     * TODO: Not sure if nessesary (wasn't in last system).
     */
    public function showAction($id) {
        $repository = $this->getDoctrine()->getRepository('AppBundle:SequenceRun');
        $sequence_run = $repository->find($id);
        return $this->render('sequence_run/show.html.twig', array('sequence_run' => $sequence_run));
    }

    /**
     * @Route("/sequence_run/edit/{id}", name="sequence_run_edit")
     */
    public function editAction(Request $request, $id) {
        $repository = $this->getDoctrine()->getRepository('AppBundle:SequenceRun');
        $sequence_run = $repository->find($id);

        $em = $this->getDoctrine()->getManager();

        $form = $this->createForm(SequenceRunType::class, $sequence_run);

        $form->handleRequest($request);

        // On submission.
        if ($form->isValid()) {
            $em->persist($sequence_run);
            $em->flush();
            return $this->redirectToRoute('sequence_run_index');
        }

        return $this->render('sequence_run/form.html.twig', array('form' => $form->createView(), 'edit' => True));
    }

    /**
     * @Route("sequence_run/delete/{id}", name="sequence_run_delete")
     */
    public function deleteAction(Request $request, $id) {
        $repository = $this->getDoctrine()->getRepository('AppBundle:SequenceRun');
        $sequence_run = $repository->find($id);

        $em = $this->getDoctrine()->getManager();
        $em->remove($sequence_run);
        $em->flush();

        $this->addFlash(
            'notice',
            '"' . $sequence_run->getId() . '" has successfully been deleted.'
        );

        return $this->redirectToRoute('sequence_run_index');
    }

}