FROM postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB testdb
EXPOSE 5432
COPY ./dmp/chmr-dmp-postgres/init.sql /docker-entrypoint-initdb.d/
CMD ["postgres"]