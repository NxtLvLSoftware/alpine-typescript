/**
 * Check if an {@link Alpine} object has the components properties.
 *
 * @param obj The Alpine object to check
 *
 * @return True if component properties are injected, false otherwise.
 */
export function satisfiesAlpineWithComponents(obj) {
    // @ts-ignore
    return !!(obj.Components && obj.component);
}
/**
 * Cast an {@link Alpine} object to {@link AlpineWithComponents} if it
 * has the injected properties.
 *
 * @param obj The Alpine object to cast
 *
 * @return The object cast to {@link AlpineWithComponents} if properties are
 * injected, null otherwise.
 */
export function castToAlpineWithComponents(obj) {
    if (obj === void 0) { obj = window.Alpine; }
    return satisfiesAlpineWithComponents(obj) ? obj : null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2xvYmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR2xvYmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCQTs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsNkJBQTZCLENBQUMsR0FBVztJQUN4RCxhQUFhO0lBQ2IsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsMEJBQTBCLENBQUMsR0FBMkI7SUFBM0Isb0JBQUEsRUFBQSxNQUFjLE1BQU0sQ0FBQyxNQUFNO0lBQ3JFLE9BQU8sNkJBQTZCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUF1QixHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUM5RSxDQUFDIn0=