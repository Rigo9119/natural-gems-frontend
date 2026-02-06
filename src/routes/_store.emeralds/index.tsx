import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_store/emeralds/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <section id="hero" className="h-screen bg-brand-primary-dark">
        <h1>Esmeraldas</h1>
      </section>
      <section id="who-we-are" className="bg-brand-primary-lighter">
        <div>
          <h2>Quienes somos</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            imperdiet, nisl eget aliquam aliquet, nisl nisl aliquet nisl, eget
            aliquam nisl nisl eget nisl. Sed imperdiet, nisl eget aliquam
            aliquet, nisl nisl aliquet nisl, eget aliquam nisl nisl eget nisl.
          </p>
        </div>
        <div>
          <img
            alt="Imagen de quienes somos"
            src="https://example.com/image.jpg"
          />
        </div>
      </section>
      <section id="collections">collections</section>
      <section id="contact">contact</section>
    </>
  );
}
