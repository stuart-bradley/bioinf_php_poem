<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * MaterialTypeStrings
 * @ORM\Table(name="material_type_strings")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\MaterialTypeStringsRepository")
 */
class MaterialTypeStrings
{
    /**
     * @var int
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(name="type", type="string")
     */
    private $type;

    /**
     * @ORM\OneToMany(targetEntity="Sample", mappedBy="materialTypeString")
     */
    private $samples;

    /**
     * @ORM\OneToMany(targetEntity="SequenceRun", mappedBy="materialTypeString")
     */
    private $sequenceRuns;

    public function __construct()
    {
        $this->samples = new ArrayCollection();
        $this->sequenceRuns = new ArrayCollection();
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->getType();
    }

    /**
     * Get id
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set type
     * @param string $type
     * @return MaterialTypeStrings
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Add sample
     * @param \AppBundle\Entity\Sample $sample
     * @return MaterialTypeStrings
     */
    public function addSample(\AppBundle\Entity\Sample $sample)
    {
        $this->samples[] = $sample;
        $sample->setMaterialTypeString($this);

        return $this;
    }

    /**
     * Remove sample
     * @param \AppBundle\Entity\Sample $sample
     */
    public function removeSample(\AppBundle\Entity\Sample $sample)
    {
        $this->samples->removeElement($sample);
    }

    /**
     * Get samples
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSamples()
    {
        return $this->samples;
    }

    /**
     * Add sequenceRun
     * @param \AppBundle\Entity\SequenceRun $sequenceRun
     * @return MaterialTypeStrings
     */
    public function addSequenceRun(\AppBundle\Entity\SequenceRun $sequenceRun)
    {
        $this->sequenceRuns[] = $sequenceRun;

        return $this;
    }

    /**
     * Remove sequenceRun
     * @param \AppBundle\Entity\SequenceRun $sequenceRun
     */
    public function removeSequenceRun(\AppBundle\Entity\SequenceRun $sequenceRun)
    {
        $this->sequenceRuns->removeElement($sequenceRun);
    }

    /**
     * Get sequenceRuns
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSequenceRuns()
    {
        return $this->sequenceRuns;
    }
}
