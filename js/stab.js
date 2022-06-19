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
   $(document).on('click', '.timeline-buttons .main-actions .answer-action', (e) => {
      const itil_status_opts = {
         Ticket: [
            {
               value: 1,
               label: _x('status', 'New'),
               icon_class: 'itilstatus new fas fa-circle'
            },
            {
               value: 2,
               label: _x('status', 'Processing (assigned)'),
               icon_class: 'itilstatus assigned far fa-circle'
            },
            {
               value: 3,
               label: _x('status', 'Processing (planned)'),
               icon_class: 'itilstatus planned fas fa-calendar'
            },
            {
               value: 4,
               label: _x('status', 'Pending'),
               icon_class: 'itilstatus waiting fas fa-circle'
            },
            {
               value: 5,
               label: _x('status', 'Solved'),
               icon_class: 'itilstatus solved far fa-circle'
            },
            {
               value: 6,
               label: _x('status', 'Closed'),
               icon_class: 'itilstatus closed fas fa-circle'
            },
         ],
         Change: [
            {
               value: 1,
               label: _x('status', 'New'),
               icon_class: 'itilstatus new fas fa-circle'
            },
            {
               value: 9,
               label: __('Evaluation'),
               icon_class: 'itilstatus eval fas fa-circle'
            },
            {
               value: 10,
               label: _n('Approval', 'Approvals', 1),
               icon_class: 'itilstatus approval fas fa-question-circle'
            },
            {
               value: 7,
               label: _x('status', 'Accepted'),
               icon_class: 'itilstatus accepted fas fa-check-circle'
            },
            {
               value: 4,
               label: _x('status', 'Pending'),
               icon_class: 'itilstatus waiting fas fa-circle'
            },
            {
               value: 11,
               label: _x('change', 'Testing'),
               icon_class: 'itilstatus test fas fa-question-circle'
            },
            {
               value: 12,
               label: __('Qualification'),
               icon_class: 'itilstatus qualif far fa-circle'
            },
            {
               value: 5,
               label: __('Applied'),
               icon_class: 'itilstatus solved fas fa-circle'
            },
            {
               value: 8,
               label: __('Review'),
               icon_class: 'itilstatus observe fas fa-eye'
            },
            {
               value: 6,
               label: _x('status', 'Closed'),
               icon_class: 'itilstatus closed fas fa-circle'
            },
            {
               value: 14,
               label: _x('status', 'Cancelled'),
               icon_class: 'itilstatus CANCELED fas fa-ban'
            },
            {
               value: 13,
               label: _x('status', 'Refused'),
               icon_class: 'itilstatus refused far fa-times-circle'
            },
         ],
         Problem: [
            {
               value: 1,
               label: _x('status', 'New'),
               icon_class: 'itilstatus new fas fa-circle'
            },
            {
               value: 7,
               label: _x('status', 'Accepted'),
               icon_class: 'itilstatus accepted fas fa-check-circle'
            },
            {
               value: 2,
               label: _x('status', 'Processing (assigned)'),
               icon_class: 'itilstatus assigned far fa-circle'
            },
            {
               value: 3,
               label: _x('status', 'Processing (planned)'),
               icon_class: 'itilstatus planned fas fa-calendar'
            },
            {
               value: 4,
               label: _x('status', 'Pending'),
               icon_class: 'itilstatus waiting fas fa-circle'
            },
            {
               value: 5,
               label: _x('status', 'Solved'),
               icon_class: 'itilstatus solved far fa-circle'
            },
            {
               value: 8,
               label: __('Under observation'),
               icon_class: 'itilstatus observe fas fa-eye'
            },
            {
               value: 6,
               label: _x('status', 'Closed'),
               icon_class: 'itilstatus closed fas fa-circle'
            },
         ]
      };
      const target_form = $($(e.target).closest('button,a').data('bs-target'));
      const valid_forms = ['new-ITILFollowup-block','new-TicketTask-block','new-ChangeTask-block','new-ProblemTask-block'];
      if (!valid_forms.includes(target_form.attr('id'))) {
         return;
      }
      const parent_itemtype = target_form.find('input[name="itemtype"]').val();
      const already_injected = target_form.find('.card-footer button.split-action').length > 0;
      if (!already_injected) {
         // Remove default button
         target_form.find('.card-footer button[name="add"]').remove();
         // Inject hidden status input
         target_form.find('form').prepend(`<input type="hidden" name="_status"/>`);
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
         $(itil_status_opts[parent_itemtype]).each((i, o) => {
            action_item_list.append(`
            <li><a class="dropdown-item" href="#" data-status="${o.value}" data-icon-class="${o.icon_class}">
                <i class="${o.icon_class}"></i>
                ${o.label}
             </a></li>
         `);
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
