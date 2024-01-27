export function validation(t, u) {
    if (Object.is(u, null)) u = false;
    if (t.title && t.description && t.tags && t.priority) {
        if (
            t.title !== u.title ||
            t.description !== u.description ||
            t.tags !== u.tags ||
            t.priority !== u.priority
        ) {
            return true;
        }
    }
    return false;
}
