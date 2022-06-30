<?php
/*
 -------------------------------------------------------------------------
 Split Timeline Action Buttons (STAB)
 Copyright (C) 2021 by Curtis Conard
 https://github.com/cconard96/glpi-stab-plugin
 -------------------------------------------------------------------------
 LICENSE
 This file is part of Split Timeline Action Buttons (STAB).
 Split Timeline Action Buttons (STAB) is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License, or
 (at your option) any later version.
 Split Timeline Action Buttons (STAB) is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 You should have received a copy of the GNU General Public License
 along with Split Timeline Action Buttons (STAB). If not, see <http://www.gnu.org/licenses/>.
 --------------------------------------------------------------------------
 */

define('PLUGIN_STAB_VERSION', '1.0.1');
define('PLUGIN_STAB_MIN_GLPI', '10.0.0');
define('PLUGIN_STAB_MAX_GLPI', '10.1.0');

function plugin_init_stab() {
   global $PLUGIN_HOOKS;

   $PLUGIN_HOOKS['csrf_compliant']['stab'] = true;

   if (Plugin::isPluginActive('stab')) {
      $timeline_pages = ['/front/ticket.form.php', '/front/change.form.php', '/front/problem.form.php'];
      $url = strtok($_SERVER["REQUEST_URI"], '?');
      foreach ($timeline_pages as $page) {
         if (str_ends_with($url, $page)) {
            $PLUGIN_HOOKS['add_javascript']['stab'][] = 'js/stab.js';
            break;
         }
      }
   }
}

function plugin_version_stab() {
   return [
      'name'         => __('Split Timeline Action Buttons', 'stab'),
      'version'      => PLUGIN_STAB_VERSION,
      'author'       => 'Curtis Conard',
      'license'      => 'GPLv2+',
      'homepage'     =>'https://github.com/cconard96/glpi-stab-plugin',
      'requirements' => [
         'glpi'   => [
            'min' => PLUGIN_STAB_MIN_GLPI,
            'max' => PLUGIN_STAB_MAX_GLPI
         ]
      ]
   ];
}
