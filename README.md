# Split Timeline Action Buttons (STAB)

Prior to GLPI 10.0, the followup and task forms in the timeline were split button dropdowns.
This allowed you to just add a followup/task or optionally add the followup/task and change the parent Ticket, Change, or Problem status.
This was useful to be able to quickly add the last task and close a ticket within the same action while only sending one notification.

Starting in GLPI 10.0, you have to add the followup/task and then change the status in two actions and triggers two notifications.

This plugin restores the split button to the task and followup forms.

## Version Support

Multiple versions of this plugin are supported at the same time to ease migration.
Only 2 major versions will be supported at the same time (Ex: v1 and v2).
When a new minor version is released, the previous minor version will have support ended after a month.
Only the latest bug fix version of each minor release will be supported.

Note: There was no official version support policy before 2022-05-19.
The following version table may be reduced based on the policy stated above.

| Plugin Version | GLPI Versions | Start of Support | End of Support |
|----------------|---------------|------------------|----------------|
| 1.0.0          | 10.0.X        | 2022-04-20       | In Support     |
