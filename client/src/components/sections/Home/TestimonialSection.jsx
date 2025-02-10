const featuredTestimonial = {
    body: 'Aura Luxe Collections provides timeless elegance. Their craftsmanship and attention to detail are unparalleled.',
    author: {
      name: 'Sophia Carter',
      handle: 'sophiacarter',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80',
      logoUrl: 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500',
    },
  };
  const testimonials = [
    [
      [
        {
          body: 'The gold necklace is exquisite and matches perfectly with every outfit. Highly recommend!',
          author: {
            name: 'Emily Johnson',
            handle: 'emilyjohnson',
            imageUrl:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
      ],
      [
        {
          body: 'The bracelet I bought is stunning. The design and craftsmanship are simply amazing.',
          author: {
            name: 'Jessica Lee',
            handle: 'jessicalee',
            imageUrl:
              'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
      ],
    ],
    [
      [
        {
          body: 'Aura Luxe has the best customer service, and their jewelry is always of the highest quality.',
          author: {
            name: 'Daniel Smith',
            handle: 'danielsmith',
            imageUrl:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
      ],
      [
        {
          body: 'I love my pearl earrings. They are elegant and perfect for any occasion.',
          author: {
            name: 'Lily Brown',
            handle: 'lilybrown',
            imageUrl:
              'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
      ],
    ],
  ];
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  
  export default function TestimonialSection() {
    return (
      <div className="relative isolate  bg-[#FFF5F7] pt-24 pb-32 sm:pt-32">
       
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold text-[#D81B60]">Testimonials</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Hear from Our Happy Customers
            </p>
          </div>
          {/* Testimonial Grid */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
            {/* Featured Testimonial */}
            <figure className="rounded-2xl bg-white ring-1 shadow-lg ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
              <blockquote className="p-6 text-lg font-semibold text-gray-900 sm:p-12 sm:text-xl">
                <p>{`“${featuredTestimonial.body}”`}</p>
              </blockquote>
              <figcaption className="flex items-center gap-x-4 px-6 py-4 border-t border-gray-200">
                <img
                  src={featuredTestimonial.author.imageUrl}
                  alt={featuredTestimonial.author.name}
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div>
                  <div className="font-medium text-gray-900">{featuredTestimonial.author.name}</div>
                  <div className="text-gray-500">{`@${featuredTestimonial.author.handle}`}</div>
                </div>
              </figcaption>
            </figure>
            {/* Remaining Testimonials */}
            {testimonials.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-8 xl:contents">
                {group.map((testimonials, columnIdx) => (
                  <div
                    key={columnIdx}
                    className={classNames(
                      'space-y-8 xl:row-start-1',
                      groupIdx === 0 && columnIdx === 0 ? 'xl:row-span-2' : '',
                    )}
                  >
                    {testimonials.map((testimonial) => (
                      <figure
                        key={testimonial.author.handle}
                        className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200"
                      >
                        <blockquote className="text-gray-700">
                          <p>{`“${testimonial.body}”`}</p>
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-x-4">
                          <img
                            src={testimonial.author.imageUrl}
                            alt={testimonial.author.name}
                            className="h-10 w-10 rounded-full"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{testimonial.author.name}</div>
                            <div className="text-gray-500">{`@${testimonial.author.handle}`}</div>
                          </div>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  