/**
 * Light-weight interface for class based components.
 *
 * Provides property declarations for Alpine magics that will exist when
 * used as an Alpine component.
 *
 * Property declarations copied from @types/alpinejs.
 *
 * {@link https://www.npmjs.com/package/@types/alpinejs}
 *
 * @public
 */
var AlpineComponent = /** @class */ (function () {
    function AlpineComponent() {
    }
    /**
     * Declare an object as an x-bind property for this component.
     *
     * Use this method to define properties for use with x-bind:
     * ```typescript
     *   protected myBinding = this.binding({
     *     ["@click.prevent"]() { console.log("click prevented!") }
     *   });
     * ```
     *
     * @protected
     *
     * @template HiddenKeys Define accessible properties (protected/private)
     * that are not included by `keyof`
     *
     * @param obj The object for use with x-bind
     *
     * @return The same object passed to {@link obj}
     */
    AlpineComponent.prototype.binding = function (obj) {
        return obj;
    };
    return AlpineComponent;
}());
export { AlpineComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxRUE7Ozs7Ozs7Ozs7O0dBV0c7QUFDSDtJQUFBO0lBK0VBLENBQUM7SUF2QkE7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNPLGlDQUFPLEdBQWpCLFVBQWtELEdBQXVEO1FBQ3hHLE9BQU8sR0FBRyxDQUFDO0lBQ1osQ0FBQztJQUVGLHNCQUFDO0FBQUQsQ0FBQyxBQS9FRCxJQStFQyJ9