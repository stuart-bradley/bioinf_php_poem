<?php
// src/AppBundle/Twig/VersionExtension.php
namespace AppBundle\Twig;

use AppBundle\Entity\Version;
use PhpOffice\PhpSpreadsheet\Calculation\DateTime;

/**
 * Class VersionExtension - converts versions to readable HTML.
 * @package AppBundle\Twig
 */
class VersionExtension extends \Twig_Extension
{
    /**
     * Defines the function name for use in twig templates.
     * @return array
     */
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('version', array($this, 'versionFunction')),
        );
    }

    /**
     * Actual function that converts a Version object into a HTML string.
     * @param Version $version
     * @return string
     */
    public function versionFunction(Version $version)
    {
        $result_html = '';
        foreach ($version->getDiff() as $key => $value) {
            // Ignore meta attributes.
            if (in_array($key, array("ID", "Updated At", "Created At"))) {
                continue;
            }

            if (is_array($value)) {
                $result_html .= $this->processArrayToHTML($key, $value);
            } else {
                $value = $this->tidyValue($value);
                $result_html .= '<div class="bg-success">' . $key . ': ' . '<p>' . $value . '</p>' . '</div>';
            }
        }
        return $result_html;
    }

    private function processArrayToHTML($key, $value)
    {
        $result_html = '';
        if (!empty($value)) {
            $result_html .= '<strong>' . $key . '</strong>';
        }

        foreach ($value as $inner_key => $inner_value) {
            if (is_array($inner_value)) {
                $result_html .= $this->processArrayToHTML($inner_key, $inner_value);
            } else {
                $inner_value = $this->tidyValue($inner_value);
                $result_html .= '<div class="bg-success">' . $inner_key . ': ' . '<p>' . $inner_value . '</p>' . '</div>';
            }
        }

        return $result_html;
    }

    /**
     * Tidies up value for display.
     * @param $value
     * @return string
     */
    private function tidyValue($value)
    {
        // Convert DateTime to String.
        if ($value instanceof \DateTime) {
            $value = $value->format('Y-m-d');
        } else if (is_bool($value)) {
            $value = ($value) ? 'true' : 'false';
        } else if (is_string($value)) {
            //Remove extra <p> tags if present.
            $value = preg_replace('!^<p>(.*?)</p>$!i', '$1', $value);
        }
        return $value;
    }
}