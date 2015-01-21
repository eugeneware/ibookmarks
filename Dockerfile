FROM tutum/buildstep
EXPOSE 5000
ENV PORT 5000
CMD ["npm", "start"]
