'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { projectImages, projectCategories } from '@/data/projects'
import { ProjectGallery } from '@/components/common/ProjectGallery'
import { SectionDivider } from '@/components/common/SectionDivider'
import { BackgroundAccent } from '@/components/common/BackgroundAccent'

export default function ReferenzenContent() {
  const [activeFilter, setActiveFilter] = useState('Alle')

  const filteredImages =
    activeFilter === 'Alle'
      ? projectImages
      : projectImages.filter((image) => image.category === activeFilter)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold font-display md:text-6xl text-foreground"
          >
            Unsere Arbeit. Ihr Vertrauen.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground"
          >
            Ausgeführte Arbeiten aus Betoninstandsetzung und Bodenbeschichtung –
            an gewerblichen, industriellen und öffentlichen Objekten.
          </motion.p>
        </div>
      </section>

      <SectionDivider variant={0} />

      {/* HIER WIRD DER NEUE HINTERGRUND-AKZENT EINGEBAUT */}
      <section className="relative py-16 overflow-hidden bg-background md:py-24 2xl:py-32">
        {/* Das ist die schwebende Form im Hintergrund */}
        <BackgroundAccent
          shape="circle"
          className="w-[800px] h-[800px] 2xl:w-[1200px] 2xl:h-[1200px] -top-1/4 -right-1/4"
        />

        <div className="container relative z-10">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 md:gap-4 2xl:gap-6 2xl:mb-16">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 text-sm md:text-base 2xl:text-lg font-semibold rounded-full transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card text-muted-foreground hover:bg-accent border border-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Die Galerie */}
          <ProjectGallery images={filteredImages} />
        </div>
      </section>
    </motion.div>
  )
}
