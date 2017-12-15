<?php
// src/AppBundle/Controller/SequenceRunController.php
namespace AppBundle\Controller;

use AppBundle\Entity\SequenceRun;
use AppBundle\Entity\Version;
use AppBundle\Form\SequenceRunType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Doctrine\Common\Collections\ArrayCollection;

class SequenceRunController extends Controller
{
    /**
     * Grid action
     * @Route("/sequence_run/datatable", name="sequence_run_datatable")
     * @return Response
     */
    public function gridAction()
    {
        return $this->datatable()->execute();
    }

    /**
     * @Route("/sequence_run/index", name="sequence_run_index")
     */
    public function indexAction() {
        $this->datatable();
        return $this->render('sequence_run/index.html.twig');
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
        if ($form->isSubmitted() && $form->isValid()) {
            $user = $this->get('security.token_storage')->getToken()->getUser();
            $sequence_run->addUser($user);
            $sequence_run->setSampleIdArray($this->createSampleIdArray($sequence_run));
            // Persist twice to first generate associations, and then generate version.
            $em->persist($sequence_run);
            $em->flush();
            $this->get('app.version_manager')->createVersion($sequence_run);
            $em->persist($sequence_run);
            $em->flush();
            return $this->redirectToRoute('sequence_run_index');
        }

        return $this->render('sequence_run/form.html.twig', array('form' => $form->createView(), 'edit' => False));
    }

    /**
     * @Route("/sequence_run/show/{id}", name="sequence_run_show")
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
        if ($form->isSubmitted() && $form->isValid()) {
            $sequence_run->setUpdatedAt(new \DateTime());
            $sequence_run->setSampleIdArray($this->createSampleIdArray($sequence_run));
            $em->persist($sequence_run);
            $em->flush();
            $this->get('app.version_manager')->createVersion($sequence_run);
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
            '"' . $id . '" has successfully been deleted.'
        );

        return $this->redirectToRoute('sequence_run_index');
    }

    /**
     * Builds an associative array of the total number of Samples and their IDs.
     * @param SequenceRun $sequence_run
     * @return array
     */
    private function createSampleIdArray($sequence_run)
    {
        $sequenceIdArray = [];
        foreach ($sequence_run->getSamples() as $sample) {
            $sequenceIdArray[] = $sample->getBCSampleID();
        }
        return [sizeof($sequenceIdArray) => $sequenceIdArray];
    }

    /**
     * set datatable configs
     * @return \Waldo\DatatableBundle\Util\Datatable
     */
    private function datatable()
    {
        return $this->get('datatable')
            ->setEntity("AppBundle:SequenceRun", "x")
            ->setFields(
            // Render replaces ID with required field
                array(
                    "ID" => 'x.id',
                    "Start/End Dates" => 'x.id',
                    "Author" => 'x.id',
                    "Kit" => 'x.kit',
                    "Material Type" => 'm.type',
                    "Samples" => 'x.sampleIdArray',
                    "" => "x.id",
                    "_identifier_" => 'x.id')
            )
            // users join not required as it's done inside renderer.
            ->addJoin('x.materialTypeString', 'm', \Doctrine\ORM\Query\Expr\Join::LEFT_JOIN)
            ->setOrder("x.id", "DESC")
            ->setRenderers(
                array(
                    1 => array(
                        'view' => 'sequence_run/datatables/_sequence_run_dates.html.twig'
                    ),
                    2 => array(
                        'view' => 'sequence_run/datatables/_sequence_run_users.html.twig'
                    ),
                    5 => array(
                        'view' => 'sequence_run/datatables/_sequence_run_samples.html.twig'
                    ),
                    6 => array(
                        'view' => 'sequence_run/datatables/_sequence_run_buttons.html.twig'
                    ),
                )
            )
            ->setGlobalSearch(true);
    }
}