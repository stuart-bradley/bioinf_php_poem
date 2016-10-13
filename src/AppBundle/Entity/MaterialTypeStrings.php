<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * MaterialTypeStrings
 *
 * @ORM\Table(name="material_type_strings")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\MaterialTypeStringsRepository")
 */
class MaterialTypeStrings
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string")
     */
    private $type;

    /**
     * @ORM\OneToMany(targetEntity="Sample", mappedBy="materialTypeString", cascade="all")
     */
    private $samples;

    public function __construct()
    {
        $this->products = new ArrayCollection();
    }


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return MaterialTypeStrings
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Add sample
     *
     * @param \AppBundle\Entity\Sample $sample
     *
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
     *
     * @param \AppBundle\Entity\Sample $sample
     */
    public function removeSample(\AppBundle\Entity\Sample $sample)
    {
        $this->samples->removeElement($sample);
    }

    /**
     * Get samples
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSamples()
    {
        return $this->samples;
    }
}
