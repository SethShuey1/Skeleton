import Image from "next/image";

export default function PastWork() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Services</h1>

      <div className="flex justify-center mb-8">
        <Image
          src="/APDS-logo.svg"
          alt="APDS Landscaping Logo"
          width={200}
          height={200}
        />
      </div>

      <p className="mb-4 text-lg">
        Welcome to APDS Landscaping, Lubbock&rsquo;s premier landscaping service
        since 2005. At APDS, we believe that every outdoor space has the
        potential to become a breathtaking oasis. Our team of skilled
        professionals combines artistic vision with horticultural expertise to
        transform ordinary yards into extraordinary landscapes that reflect the
        unique beauty of West Texas.
      </p>

      <p className="text-lg">
        Founded by lifelong Lubbock residents Amanda and Paul Davis, APDS
        Landscaping has grown from a small family operation to a trusted name in
        residential and commercial landscaping across the South Plains. We pride
        ourselves on our deep understanding of local climate conditions, water
        conservation techniques, and native plant species. Whether you&rsquo;re
        looking to create a drought-resistant xeriscape, install a custom
        irrigation system, or design a lush garden retreat, APDS Landscaping is
        committed to bringing your vision to life while respecting the natural
        environment of our beloved Lubbock community.
      </p>
    </div>
  );
}
