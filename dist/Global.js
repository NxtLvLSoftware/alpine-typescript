/**
 * Check if an {@link Alpine} object has the components properties.
 *
 * @public
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
 * @public
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2xvYmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0dsb2JhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErQkE7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsNkJBQTZCLENBQUMsR0FBVztJQUN4RCxhQUFhO0lBQ2IsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sVUFBVSwwQkFBMEIsQ0FBQyxHQUEyQjtJQUEzQixvQkFBQSxFQUFBLE1BQWMsTUFBTSxDQUFDLE1BQU07SUFDckUsT0FBTyw2QkFBNkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQXVCLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzlFLENBQUMifQ==