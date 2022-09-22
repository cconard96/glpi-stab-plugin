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

$(document).ready(function() {
   const ajax_url = CFG_GLPI.root_doc+"/"+GLPI_PLUGINS_PATH.stab+"/ajax/status.php";

   $(document).on('click', '.timeline-buttons .main-actions .answer-action', (e) => {
      const target_form = $($(e.target).closest('button,a').data('bs-target'))
      const valid_forms = [/^new-\S+Followup-block$/,/^new-\S+Task-block$/];
      if (!valid_forms.some((regex) => regex.test(target_form.attr('id')))) {
         return;
      }
      const parent_itemtype = target_form.find('input[name="itemtype"]').val();
      const parent_items_id = target_form.find('input[name="items_id"]').val();

      const already_injected = target_form.find('.card-footer button.split-action').length > 0;
      if (!already_injected) {
         // Remove default button
         target_form.find('.card-footer button[name="add"]').remove();

         // Add split button
         target_form.find('.card-footer').prepend(`
            <div class="btn-group">
               <button type="submit" class="btn btn-primary split-action" name="add">${__('Add')}</button>
               <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span class="sr-only">Toggle Dropdown</span>
               </button>
               <ul class="dropdown-menu split-action-items">
               </ul>
            </div>
         `);
         const action_item_list = target_form.find('.card-footer .split-action-items');
         $.ajax({
            method: 'GET',
            url: ajax_url,
            data: {
               itemtype: parent_itemtype,
               items_id: parent_items_id,
            }
         }).done((data) => {
            if (data['current_status'] !== undefined) {
               const current_status = data['current_status'];
               const status_options = data['allowed_statuses'];
               $(status_options).each((i, o) => {
                  action_item_list.append(`
                     <li><a class="dropdown-item" href="#" data-status="${o.value}" data-icon-class="${o.icon_class}">
                         <i class="${o.icon_class}"></i>
                         ${o.label}
                      </a></li>
                  `);
               });
               // Inject hidden status input
               target_form.find('form').prepend(`<input type="hidden" name="_status" value="${current_status}"/>`);
            }
         });

         target_form.on('click', '.split-action-items a.dropdown-item', (e) => {
            const t = $(e.target);
            target_form.find('form').find('input[name="_status"]').val(t.attr('data-status'));
            target_form.find('.card-footer button.split-action').html(`
                <i class="${t.attr('data-icon-class')} me-2"></i>
                ${__('Add')}
            `);
         });
      }
   });
});
