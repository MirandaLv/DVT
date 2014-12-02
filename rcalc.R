
library("raster")
library("rgdal")
library("leafletR")

readIn <- commandArgs(trailingOnly = TRUE)

in_country <- readIn[1]
in_type <- readIn[2]
in_sub <- readIn[3]
in_startYear <- as.numeric(readIn[4])
in_endYear <- as.numeric(readIn[5])
in_continent <- readIn[6]


# setwd("/var/www/html/aiddata/home/data")
# geojson <- readOGR("source/Leaflet.geojson", "OGRGeoJSON")
geojson <- readOGR(paste("/var/www/html/aiddata/DET/resources",in_continent,in_country,"shapefiles/Leaflet.geojson",sep="/"), "OGRGeoJSON")

# base_file <- paste("raster1/asia__nepal__3_district__2011__agriculture__agricultural_aid__",in_startYear,".csv",sep="")
# base_csv <- read.csv(base_file)
# base_col <- paste("agriculture_",in_startYear,sep="")
# r1sum <- base_csv[,base_col]

# count <- in_endYear-in_startYear
# for (i in 1:count){
# 	year <- in_startYear + i
# 	new_file <- paste("raster1/asia__nepal__3_district__2011__agriculture__agricultural_aid__",year,".csv",sep="")
# 	new_csv <- read.csv(new_file)
# 	new_col <- paste("agriculture_",year,sep="")
# 	r1sum <- r1sum + new_csv[,new_col]
# }

# r2file <- "raster2/asia__nepal__3_district__2011__vegetation__ndvi__2001.csv"
# r2csv <- read.csv(r2file)


# geojson@data["sum"] <- r1sum
# r1sump <- r1sum / sum(r1sum)
# geojson@data["sump"] <- r1sump

# ndvi <- r2csv$gimms_ndvi_qd_20010700
# ndvi[ndvi < 0] <- 0.123
# geojson@data["ndvi"] <- ndvi
# ndvip <- ndvi / sum(ndvi)
# geojson@data["ndvip"] <- ndvip

# ratio <- r1sump - ndvip
# geojson@data["ratio"] <- ratio

# sd <- (ratio-mean(ratio))/sd(ratio)
# geojson@data["sd"] <- sd


setwd("/var/www/html/aiddata/home/data/poly")

filename <- paste(in_country,in_type,in_sub,in_startYear,in_endYear,sep="_")

toGeoJSON(data=geojson, name=filename)
