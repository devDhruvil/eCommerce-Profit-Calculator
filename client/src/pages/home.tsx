import { WaitlistForm } from "@/components/waitlist-form";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                The Next Big Thing
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">
                Join the waitlist for early access to our revolutionary product
                that's changing the game.
              </p>
              <div className="mt-8">
                <WaitlistForm />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-square rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1547444196-2ea3ce201cc6"
                alt="Product Preview"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold">Why Choose Us</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover the features that set us apart
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-background rounded-lg p-6 shadow-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1506729623306-b5a934d88b53"
                alt="Feature 1"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Innovative Design</h3>
              <p className="text-muted-foreground">
                Experience cutting-edge technology with our intuitive interface.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-background rounded-lg p-6 shadow-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1559273514-468728ffc16c"
                alt="Feature 2"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Seamless Integration</h3>
              <p className="text-muted-foreground">
                Effortlessly integrate with your existing workflow.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
