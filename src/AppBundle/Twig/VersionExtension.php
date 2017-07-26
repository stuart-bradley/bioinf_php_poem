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
     * @param array $hydrated_entity
     * @return string
     */
    public function versionFunction($hydrated_entity, $title = null, $indent = 0)
    {
        $result_html = '';
        if (!empty($hydrated_entity) and $title != null) {
            $result_html .= '<div style="text-indent:' . (intval($indent) * 20) . 'px"><strong>' . $title . '</strong></div>';
        }
        foreach ($hydrated_entity as $key => $value) {
            // Ignore meta attributes.
            if (in_array($key, array("ID", "Updated At", "Created At"))) {
                continue;
            }

            if (is_array($value)) {
                $result_html .= $this->versionFunction($value, $key, ($indent + 0.5));
            } else {
                $value = $this->tidyValue($value);
                $result_html .= '<div class="bg-success" style="text-indent:' . (intval($indent) * 20) . 'px">' . $key . ': ' . '<p>' . $value . '</p>' . '</div>';
            }
        }
        return $result_html;
    }

    private function processArrayToHTML($key, $value)
    {
        $result_html = '';


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