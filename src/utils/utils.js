export function Notification(title_context, message, type_context) {
    this.$notify({
      title: title_context,
      message: message,
      type: type_context,
    });
  }